const openShareDropdown = (id) => {

    const sharedProject = document.getElementById(id);
    const selectedCompStyle = sharedProject.getElementsByClassName("share_dropdown_div");
    if (selectedCompStyle[0].classList.contains("active")) {
        selectedCompStyle[0].classList.remove("active");
    } else {
        selectedCompStyle[0].classList.add("active");
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

