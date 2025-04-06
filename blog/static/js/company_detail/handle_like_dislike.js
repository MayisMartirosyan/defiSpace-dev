const like_button = document.getElementById(
  "cmp_det_comment_author_react_like_count_div"
);
const dislike_button = document.getElementById(
  "cmp_det_comment_author_react_dislike_count_div"
);

let likeBoolean = false;
let dislikeBoolean = false;

function handleLikeButton() {
  if (dislikeBoolean) {
    handleDislikeButton();
    dislikeBoolean = false;
  }
  like_button.style.opacity = likeBoolean ? 0.5 : 1;
  likeBoolean = !likeBoolean;
}

function handleDislikeButton() {
  if (likeBoolean) {
    handleLikeButton();
    likeBoolean = false;
  }
  dislike_button.style.opacity = dislikeBoolean ? 0.5 : 1;
  dislikeBoolean = !dislikeBoolean;
}

if (like_button) {
  like_button.addEventListener("click", () =>
    handleLikeButton(like_button, likeBoolean)
  );
}

if (dislike_button) {
  dislike_button.addEventListener("click", () =>
    handleDislikeButton(dislike_button, dislikeBoolean)
  );
}

// Alternative solution

// const first_btn = document.getElementById("first_btn")
// const second_btn = document.getElementById("second_btn")

// const booleanObj = {
//   first: false,
//   second: false,
// }

// function checkColor() {
//   first_btn.style.background = booleanObj.first ? "darkorange" : "darkgreen"
//   second_btn.style.background = booleanObj.second ? "darkorange" : "darkgreen"
// }

// function handleChange(type) {
//   if (type === "like") {
//     if (booleanObj.second) {
//       booleanObj.second = !booleanObj.second
//     }
//     booleanObj.first = !booleanObj.first
//     first_btn.style.background = booleanObj.first ? "darkorange" : "darkgreen"
//   } else if (type === "dislike") {
//     if (booleanObj.first) {
//       booleanObj.first = !booleanObj.first
//     }
//     booleanObj.second = !booleanObj.second
//     second_btn.style.background = booleanObj.second ? "darkorange" : "darkgreen"
//   }
//   checkColor()
// }

// first_btn.addEventListener("click", () => handleChange("like"))
// second_btn.addEventListener("click", () => handleChange("dislike"))
