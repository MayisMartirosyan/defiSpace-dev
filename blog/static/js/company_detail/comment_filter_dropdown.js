const cmp_det_comment_filter_dropdown_list = document.getElementById("cmp_det_comment_filter_dropdown_list");
const cmp_det_comment_filter_dropdown = document.getElementById("cmp_det_comment_filter_dropdown");
const cmp_det_comment_filter_current = document.getElementById("cmp_det_comment_filter_current");
const cmp_det_comment_filter_dropdown_types = document.getElementById("cmp_det_comment_filter_dropdown_types");



let currentTypes = [];
let filterDropdownBoolean = true;
const dropdownFilterTypes = [
  {
    type: "All comments",
    items: []
  },
  {
    type: "Team",
    items: [`<div class="companies_list_settings_option">
                                <label for="team">Decentralization</label>
                                <input type="radio" id="team" name="status" value="team" />
                                <img
                                  src="{% static 'img/companies/companies_radio_icon.svg' %}"
                                  width="16px"
                                  height="16px"
                                  id="companies_radio_button"
                                  alt="companies_radio_icon"
                                />
                            </div>`, `<div class="companies_list_settings_option">
                                <label for="team">Activity</label>
                                <input type="radio" id="team" name="status" value="team" />
                                <img
                                  src="{% static 'img/companies/companies_radio_icon.svg' %}"
                                  width="16px"
                                  height="16px"
                                  id="companies_radio_button"
                                  alt="companies_radio_icon"
                                />
                            </div>`]
  },
  {
    type: "Product",
    items: ["Monthly active users", "APY 1 year", "APY 5 years"]
  },
  {
    type: "Security",
    items: ["Asset secured", "Max supply", "Liquidity"]
  },
];

function FilterDropdownOpenClose() {
  cmp_det_comment_filter_dropdown_list.style.display = filterDropdownBoolean
    ? "block"
    : "none";
  filterDropdownBoolean = !filterDropdownBoolean;
}

function FilterDropdown(event) {
  cmp_det_comment_filter_current.innerText = event.target.innerText;
  for(let i = 0; i < dropdownFilterTypes.length; i++){
    if(event.target.innerText === dropdownFilterTypes[i].type){
      currentTypes = dropdownFilterTypes[i].items;
    }
  }

  cmp_det_comment_filter_dropdown_types.innerHTML = '';

  for(let i = 0; i < currentTypes.length; i++){
    const newDiv = document.createElement("div");
    const node = document.createTextNode(`${currentTypes[i]}`);
    newDiv.appendChild(node);
    cmp_det_comment_filter_dropdown_types.appendChild(newDiv);
  }
  
  FilterDropdownOpenClose();
}

cmp_det_comment_filter_dropdown.addEventListener(
  "click",
  FilterDropdownOpenClose
);
