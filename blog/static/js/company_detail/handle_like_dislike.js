const like_button = document.getElementById("cmp_det_comment_author_react_like_count_div");
const dislike_button = document.getElementById("cmp_det_comment_author_react_dislike_count_div");

let likeBoolean = false;
let dislikeBoolean = false;

function handleLikeButton(){
  if(dislikeBoolean) {
    handleDislikeButton();
    dislikeBoolean = false;
  }
  like_button.style.opacity = likeBoolean ? 0.5 : 1;
  likeBoolean = !likeBoolean;
}

function handleDislikeButton(){
  if(likeBoolean) {
    handleLikeButton();
    likeBoolean = false;
  }
  dislike_button.style.opacity = dislikeBoolean ? 0.5 : 1;
  dislikeBoolean = !dislikeBoolean;
}


like_button.addEventListener("click", () => handleLikeButton(like_button, likeBoolean));
dislike_button.addEventListener("click", () => handleDislikeButton(dislike_button, dislikeBoolean));