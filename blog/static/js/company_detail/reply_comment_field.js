const cmp_det_comment_for_reply_textarea_div = document.getElementById("cmp_det_comment_for_reply_textarea_div");
const cmp_det_comment_author_reply_comment = document.getElementById("cmp_det_comment_author_reply_comment");

let displayBool = true;

function DisplayReplyForm(){
  const currentStyle = displayBool ? "flex" : "none";
  cmp_det_comment_for_reply_textarea_div.style.display = currentStyle;
  displayBool = !displayBool;
}

cmp_det_comment_author_reply_comment.addEventListener("click", () => DisplayReplyForm());