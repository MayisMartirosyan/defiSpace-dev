const handle_build_redirect_url = (e, id) => {
  e.stopPropagation();
  const tagsDiv = document.getElementById(id).children;

  let buildedUrl = "/?q=";
  for (const element of tagsDiv) {
    buildedUrl += `&tag_rating=${element.id}`;
  }

  buildedUrl += "&page=1#timeline_tags_article";
  window.location.href = buildedUrl;
};

const handle_build_company_inner_url = (e, id) => {
  let buildedUrl = `/companies/${id}`;
  window.location.href = buildedUrl;
};


const handle_force_redirect = (e) =>{
  e.stopPropagation()
}