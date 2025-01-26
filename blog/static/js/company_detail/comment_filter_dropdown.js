const cmp_det_comment_filter_dropdown_list = document.getElementById(
  "cmp_det_comment_filter_dropdown_list"
);
const cmp_det_comment_filter_dropdown = document.getElementById(
  "cmp_det_comment_filter_dropdown"
);
const cmp_det_comment_filter_current = document.getElementById(
  "cmp_det_comment_filter_current"
);
const cmp_det_comment_filter_dropdown_types = document.getElementById(
  "cmp_det_comment_filter_dropdown_types"
);

let currentTypes = [];
let filterDropdownBoolean = true;
const dropdownFilterTypes = [
  {
    type: "All comments",
    items: []
  },
  {
    type: "Team",
    items: ["Decentralization", "Activity"]
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
  for (let i = 0; i < dropdownFilterTypes.length; i++) {
    if (event.target.innerText === dropdownFilterTypes[i].type) {
      currentTypes = dropdownFilterTypes[i].items;
    }
  }

  cmp_det_comment_filter_dropdown_types.innerHTML = "";

  for (let i = 0; i < currentTypes.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "cmp_filter_checkbox_div";

    if(!i){
      newDiv.style.marginTop = "12px";
    }

    // Create the label element
    const label = document.createElement("label");
    label.setAttribute("for", "team");
    label.textContent = currentTypes[i]; // Label text

    // Create the input radio element
    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("id", "team");
    checkInput.setAttribute("name", "status");
    checkInput.setAttribute("value", "team");
    checkInput.style.backgroundColor = "darkgreen";
    checkInput.style.width = "fit-content";

    // Create the img element
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      '/static/img/company_detail/checked_icon.svg'
    );
    img.setAttribute("width", "16px");
    img.setAttribute("height", "16px");
    img.setAttribute("id", "companies_radio_button");
    img.setAttribute("alt", "companies_radio_icon");

    // Append the elements in the right order
    newDiv.appendChild(label);
    newDiv.appendChild(checkInput);
    newDiv.appendChild(img);

    // const node = document.createTextNode(`${currentTypes[i]}`);
    // newDiv.appendChild(node);

    cmp_det_comment_filter_dropdown_types.appendChild(newDiv);
  }

  FilterDropdownOpenClose();
}

cmp_det_comment_filter_dropdown.addEventListener(
  "click",
  FilterDropdownOpenClose
);
