const handle_build_redirect_url = (id) => {
  const tagsDiv = document.getElementById(id).children;

  let buildedUrl = "/?q=";
  for (const element of tagsDiv) {
    buildedUrl += `&tag_rating=${element.id}`;
  }

  buildedUrl += "&page=1#timeline_tags_article";
  window.location.href = buildedUrl;
};
