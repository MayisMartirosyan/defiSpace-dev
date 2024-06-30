const search_input_desktop = document.getElementById("timeline_search_input_desktop");
const timeline_calendar_div_desktop = document.getElementById("timeline_calendar_div_desktop");
const timeline_calendar_desktop = document.getElementById("timeline_calendar_desktop");
const search_icon_desktop = document.getElementById("search_icon_desktop");
const search_max_vector_desktop = document.getElementById("search_max_vector_desktop");
const search_max_vector_desktop_div = document.getElementById("search_max_vector_desktop_div");
const dropdown_arrow = document.getElementById("dropdown_arrow");
const timeline_calendar_selected_button_desktop = document.getElementById("timeline_calendar_selected_button_desktop");
const timeline_dropdown_div_desktop = document.getElementById("timeline_dropdown_div_desktop");
const timeline_dropdown = document.getElementById("timeline_dropdown");


// Toggle options visibility

function toggleOptions() {
    timeline_dropdown_div_desktop.style.display = (timeline_dropdown_div_desktop.style.display === 'block') ? 'none' : 'block';
    if (timeline_dropdown_div_desktop.style.display === 'block') {
        timeline_dropdown_div_desktop.style.padding = "4px";
    }
}

// Select option function

let current_option_text = timeline_calendar_selected_button_desktop.innerText;

function selectOption(option) {
    timeline_dropdown_div_desktop.style.padding = "0px";
    timeline_calendar_selected_button_desktop.innerText = option.innerText;

    // Deselect previous selected option
    let selectedOption = document.querySelector('.timeline_calendar_option.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }

    // Mark the selected option
    option.classList.add('selected');

    // Hide options after selection
    timeline_dropdown_div_desktop.style.display = 'none';
    current_option_text = option.innerText;
}

search_input_desktop.addEventListener("focus", () => {
    search_input_desktop.placeholder = "Type something";
    timeline_calendar_desktop.style.width = "0px";
    timeline_calendar_desktop.style.transition = "all 0.4s linear";
    timeline_calendar_div_desktop.style.opacity = "0";
    timeline_calendar_div_desktop.style.pointerEvents = "none";
    timeline_dropdown_div_desktop.style.pointerEvents = 'none';
    dropdown_arrow.style.width = "0px";
    timeline_calendar_selected_button_desktop.style.width = "0px";
    timeline_calendar_desktop.style.paddingLeft = "0px";
    timeline_calendar_desktop.style.paddingRight = "0px";
    timeline_calendar_desktop.style.color = "rgba(0,0,0,0)";
    timeline_calendar_div_desktop.style.height = "40px";
    search_icon_desktop.style.display = "none";
    search_max_vector_desktop.style.display = "block";
    search_max_vector_desktop_div.style.width = "24px";
    search_max_vector_desktop_div.style.height = "24px";
});


search_max_vector_desktop_div.addEventListener("click", () => {
    search_input_desktop.placeholder = "Search";
    timeline_calendar_div_desktop.style.transition = "all 0.4s linear";
    timeline_calendar_desktop.style.width = "180px";
    timeline_calendar_div_desktop.style.opacity = "1";
    timeline_calendar_div_desktop.style.pointerEvents = "all";
    timeline_dropdown_div_desktop.style.pointerEvents = 'all';
    timeline_calendar_selected_button_desktop.style.width = "auto";
    timeline_calendar_desktop.style.paddingLeft = "20px";
    timeline_calendar_desktop.style.paddingRight = "20px";
    timeline_calendar_desktop.style.color = "#FFFFFF";
    dropdown_arrow.style.width = "auto";
    timeline_calendar_div_desktop.style.height = "40px";
    search_icon_desktop.style.display = "block";
    search_max_vector_desktop.style.display = "none";
    search_max_vector_desktop_div.style.width = "0px";
    search_max_vector_desktop_div.style.height = "0px";
});


// For mobile

const search_input_mobile = document.getElementById("timeline_search_input_mobile");
const timeline_calendar_div_mobile = document.getElementById("timeline_calendar_div_mobile");
const timeline_calendar_mobile = document.getElementById("timeline_calendar_mobile");
const search_icon_mobile = document.getElementById("search_icon_mobile");
const search_max_vector_mobile = document.getElementById("search_max_vector_mobile");
const search_max_vector_mobile_div = document.getElementById("search_max_vector_mobile_div");
// const dropdown_arrow = document.getElementById("dropdown_arrow");
const timeline_calendar_selected_button_mobile = document.getElementById("timeline_calendar_selected_button_mobile");
const timeline_dropdown_div_mobile = document.getElementById("timeline_dropdown_div_mobile");
// const timeline_dropdown = document.getElementById("timeline_dropdown");



// Toggle options visibility

function toggleOptionsMob() {
    timeline_dropdown_div_mobile.style.display = (timeline_dropdown_div_mobile.style.display === 'block') ? 'none' : 'block';
    if (timeline_dropdown_div_mobile.style.display === 'block') {
        timeline_dropdown_div_mobile.style.padding = "4px";
    }
}


// Select option function

// let current_option_text = timeline_calendar_selected_button_desktop.innerText;

function selectOptionMob(option) {
    timeline_dropdown_div_mobile.style.padding = "0px";
    timeline_calendar_selected_button_mobile.innerText = option.innerText;

    // Deselect previous selected option
    let selectedOption = document.querySelector('.timeline_calendar_option.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }

    // Mark the selected option
    option.classList.add('selected');

    // Hide options after selection
    timeline_dropdown_div_mobile.style.display = 'none';
    current_option_text = option.innerText;
}


search_input_mobile.addEventListener("focus", () => {
    search_input_mobile.placeholder = "Type something";
    timeline_calendar_mobile.style.width = "0px";
    timeline_calendar_div_mobile.style.opacity = "0";
    timeline_calendar_div_mobile.style.pointerEvents = "none";
    timeline_dropdown_div_mobile.style.pointerEvents = 'none';
    dropdown_arrow.style.width = "0px";
    timeline_calendar_selected_button_mobile.style.width = "0px";
    timeline_calendar_selected_button_mobile.innerText = "";
    timeline_calendar_mobile.style.paddingLeft = "0px";
    timeline_calendar_mobile.style.paddingRight = "0px";
    timeline_calendar_mobile.style.color = "rgba(0,0,0,0)";
    timeline_calendar_div_mobile.style.height = "40px";
    search_icon_mobile.style.display = "none";
    // search_max_vector_mobile.style.display = "block !important";
    search_max_vector_mobile_div.style.display = "flex";
    search_max_vector_mobile_div.style.width = "24px";
    search_max_vector_mobile_div.style.height = "24px";
});


search_max_vector_mobile_div.addEventListener("click", () => {
    search_input_mobile.placeholder = "Search";
    timeline_calendar_mobile.style.width = "180px";
    timeline_calendar_div_mobile.style.opacity = "1";
    timeline_calendar_div_mobile.style.pointerEvents = "all";
    timeline_dropdown_div_mobile.style.pointerEvents = 'all';
    timeline_calendar_selected_button_mobile.style.width = "auto";
    timeline_calendar_selected_button_mobile.innerText = current_option_text;
    timeline_calendar_mobile.style.paddingLeft = "20px";
    timeline_calendar_mobile.style.paddingRight = "20px";
    timeline_calendar_mobile.style.color = "#FFFFFF";
    dropdown_arrow.style.width = "auto";
    timeline_calendar_div_mobile.style.height = "40px";
    search_icon_mobile.style.display = "block";
    // search_max_vector_mobile.style.display = "none";
    search_max_vector_mobile_div.style.display = "none";
    search_max_vector_mobile_div.style.width = "0px";
    search_max_vector_mobile_div.style.height = "0px";
});