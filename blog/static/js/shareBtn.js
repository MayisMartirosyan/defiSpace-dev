const post_detail_slider_buttons_div = document.getElementById("post_detail_slider_buttons_div");


const openShareDropdown = (id) => {
    const sharedProject = document.getElementById(id);
    const selectedCompStyle = sharedProject.getElementsByClassName("share_dropdown_div");
    if (selectedCompStyle[0].classList.contains("active")) {
        selectedCompStyle[0].classList.remove("active");
        post_detail_slider_buttons_div.style.display = "flex";
    } else {
        selectedCompStyle[0].classList.add("active");
        post_detail_slider_buttons_div.style.display = "none";
    }
};


function copyToClipboard(e,text) {
    e.preventDefault();
    let textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

