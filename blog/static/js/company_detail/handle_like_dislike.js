const commentDivs = document.querySelectorAll(
  ".cmp_det_comment[data-comment-id], .cmp_det_comment_for_reply[data-comment-id]"
);

commentDivs.forEach((commentDiv) => {
  const commentId = commentDiv.getAttribute("data-comment-id");

  const likeButton = commentDiv.querySelector(
    ".cmp_det_comment_author_react_like_count_div"
  );
  const dislikeButton = commentDiv.querySelector(
    ".cmp_det_comment_author_react_dislike_count_div"
  );

  if (!likeButton || !dislikeButton) {
    return;
  }

  const likeCountSpan = likeButton.querySelector(
    ".cmp_det_comment_author_react_like_count"
  );
  const dislikeCountSpan = dislikeButton.querySelector(
    ".cmp_det_comment_author_react_dislike_count"
  );

  const storageKey = `comment_${commentId}_reaction`;

  let currentReaction = localStorage.getItem(storageKey);

  updateUI(currentReaction);

  likeButton.addEventListener("click", () => {
    if (currentReaction === "like") {
      sendReaction("remove_like", commentId);
      currentReaction = null;
      likeCountSpan.innerText = parseInt(likeCountSpan.innerText) - 1;
      updateUI(currentReaction);
      localStorage.removeItem(storageKey);
    } else if (currentReaction === "dislike") {
      sendReaction("switch_to_like", commentId);
      currentReaction = "like";
      dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) - 1;
      likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1;
      updateUI(currentReaction);
      localStorage.setItem(storageKey, "like");
    } else {
      sendReaction("like", commentId);
      currentReaction = "like";
      likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1;
      updateUI(currentReaction);
      localStorage.setItem(storageKey, "like");
    }
  });

  dislikeButton.addEventListener("click", () => {
    if (currentReaction === "dislike") {
      sendReaction("remove_dislike", commentId);
      currentReaction = null;
      dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) - 1;
      updateUI(currentReaction);
      localStorage.removeItem(storageKey);
    } else if (currentReaction === "like") {
      sendReaction("switch_to_dislike", commentId);
      currentReaction = "dislike";
      likeCountSpan.innerText = parseInt(likeCountSpan.innerText) - 1;
      dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) + 1;
      updateUI(currentReaction);
      localStorage.setItem(storageKey, "dislike");
    } else {
      sendReaction("dislike", commentId);
      currentReaction = "dislike";
      dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) + 1;
      updateUI(currentReaction);
      localStorage.setItem(storageKey, "dislike");
    }
  });

  function updateUI(reaction) {
    if (reaction === "like") {
      likeButton.style.opacity = 1;
      dislikeButton.style.opacity = 0.5;
    } else if (reaction === "dislike") {
      dislikeButton.style.opacity = 1;
      likeButton.style.opacity = 0.5;
    } else {
      likeButton.style.opacity = 0.5;
      dislikeButton.style.opacity = 0.5;
    }
  }

  function sendReaction(action, commentId) {
    let url = `/comments/${commentId}/${action}/`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server confirmed:", data);
      })
      .catch((error) => {
        console.error("Error sending reaction:", error);
      });
  }

  function getCSRFToken() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return decodeURIComponent(value);
      }
    }
    return "";
  }
});
