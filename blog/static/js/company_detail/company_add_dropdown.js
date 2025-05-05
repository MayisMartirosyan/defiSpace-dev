const add_comment_asset_secured_p = document.getElementById(
  "cmp_det_add_comment_asset_secured_p"
);
const cmp_det_add_comment_asset_secured = document.getElementById(
  "cmp_det_add_comment_asset_secured"
);
const cmp_det_list_sub_criterion = document.getElementById(
  "cmp_det_list_sub_criterion"
);

let subCriterionBool = true;
let dynamicCategory = "Security";
let dynamicSubCategory = "Asset secured";

function OpenCloseSubCriterion() {
  const currentStyle = subCriterionBool ? "block" : "none";
  cmp_det_list_sub_criterion.style.display = currentStyle;
  subCriterionBool = !subCriterionBool;
}

function makeActiveCategory(event) {
  dynamicCategory = event.target.getElementsByTagName("span")[0].innerText;
  dynamicCategory = dynamicCategory.split("/")[0].trim();
  dynamicSubCategory = event.target.getElementsByTagName("span")[1].innerText;

  console.log(event.target.getElementsByTagName("span"), "qweqwew");
  add_comment_asset_secured_p.innerText =
    event.target.getElementsByTagName("span")[0].innerText +
    event.target.getElementsByTagName("span")[1].innerText;
  OpenCloseSubCriterion();
}

if (cmp_det_add_comment_asset_secured) {
  cmp_det_add_comment_asset_secured.addEventListener("click", () =>
    OpenCloseSubCriterion()
  );
}

const sendBtn = document.querySelector(".cmp_det_comment_btn");
const textarea = document.querySelector(".cmp_det_comment_textarea");
const nameInput = document.querySelector(".cmp_det_comment_input");

if (sendBtn && textarea && nameInput) {
  sendBtn.addEventListener("click", async () => await sendComment());

  textarea.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendComment();
    }
  });

  nameInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendComment();
    }
  });
}

async function sendComment() {
  const description = textarea.value.trim();
  const category = dynamicCategory;
  const subcategory = dynamicSubCategory;
  const companyId = window.location.pathname.split("/")[2];
  const name = nameInput.value.trim();
  const parentId = null;

  if (!description) return;

  const payload = {
    name,
    description,
    company_id: companyId,
    category,
    subcategory,
    parent_id: parentId,
  };

  try {
    const response = await fetch("/add-comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.status === "success") {
      window.history.replaceState(null, "", window.location.pathname);
      location.reload();
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.error("Error sending comment:", error);
  }
}

function toggleReplyForm(replyButton) {
  const commentDiv = replyButton.closest(".cmp_det_comment");
  const commentId = commentDiv.getAttribute("data-comment-id");

  if (!commentId) {
    console.error("Comment ID not found.");
    return;
  }

  const allComments = document.querySelectorAll(".cmp_det_comment");
  let foundMainComment = false;
  let replyFormDiv = null;

  allComments.forEach((div) => {
    if (div === commentDiv) {
      foundMainComment = true;
      return;
    }
    if (foundMainComment && div.getAttribute("data-comment-id") === commentId) {
      replyFormDiv = div.querySelector(
        ".cmp_det_comment_for_reply_textarea_div"
      );
      return;
    }
  });

  if (replyFormDiv) {
    replyFormDiv.style.display =
      replyFormDiv.style.display === "none" || replyFormDiv.style.display === ""
        ? "block"
        : "none";
  } else {
    console.error("Reply form not found.");
  }
}

async function submitReply(button) {

  const wrapperDiv = button.closest(".cmp_det_comment_for_reply_textarea_div");

  const replyTextarea = wrapperDiv.querySelector(
    ".cmp_det_comment_for_reply_textarea"
  );
  const nameInput = wrapperDiv.querySelector(".cmp_det_reply_nameInp");

  const replyText = replyTextarea.value.trim();
  const userName = nameInput.value.trim();

  if (!replyText || !userName) return;

  const parentCommentId = button
    .closest(".cmp_det_comment")
    .getAttribute("data-comment-id");
  const companyId = window.location.pathname.split("/")[2];

  try {
    const response = await fetch("/submit-reply/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        company_id: companyId,
        parent_comment_id: parentCommentId,
        reply_text: replyText,
        name: userName,
      }),
    });

    const data = await response.json();
    if (data.success) {
      replyTextarea.value = "";
      window.history.replaceState(null, "", window.location.pathname);
      location.reload();
    }
  } catch (error) {
    console.error("Error submitting reply:", error);
    alert("There was an error submitting your reply.");
  }
}

document
  .querySelectorAll(".cmp_det_comment_for_reply_textarea")
  .forEach((textarea) => {
    textarea.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const sendButton = this.nextElementSibling;
        submitReply(sendButton);
      }
    });
  });

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    document.cookie.split(";").forEach((cookie) => {
      const trimmed = cookie.trim();
      if (trimmed.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
      }
    });
  }
  return cookieValue;
}
