const handle_build_redirect_url = (id) =>{

    const tagsDiv = document.getElementById(id).children

    let url = "/?q="
    for (const element of tagsDiv) {
        url += `&tag_rating=${element.id}`
    }

    url += "&page=1"
    
    window.location.href = url


}