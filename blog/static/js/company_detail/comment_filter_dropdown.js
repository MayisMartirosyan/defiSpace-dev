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
    items: [],
  },
  {
    type: "Team",
    items: [
      {
        name: "Decentralization",
        checked: true,
      },
      {
        name: "Activity",
        checked: true,
      },
    ],
  },
  {
    type: "Product",
    items: [
      {
        name: "Monthly active users",
        checked: true,
      },
      {
        name: "APY 1 year",
        checked: true,
      },
      {
        name: "APY 5 years",
        checked: true,
      },
    ],
  },
  {
    type: "Security",
    items: [
      {
        name: "Asset secured",
        checked: true,
      },
      {
        name: "Max supply",
        checked: true,
      },
      {
        name: "Liquidity",
        checked: true,
      }
    ]
  }
];

function FilterDropdownOpenClose() {
  cmp_det_comment_filter_dropdown_list.style.display = filterDropdownBoolean
    ? "block"
    : "none";
  filterDropdownBoolean = !filterDropdownBoolean;
}

function FilterDropdown(event, bool) {

  cmp_det_comment_filter_current.innerText = event.target.innerText.trim();

  for (let i = 0; i < dropdownFilterTypes.length; i++) {
    if (event.target.innerText === dropdownFilterTypes[i].type) {
      currentTypes = dropdownFilterTypes[i].items;
    }
  }

  cmp_det_comment_filter_dropdown_types.innerHTML = "";

  for (let i = 0; i < currentTypes.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "cmp_filter_checkbox_div";

    const currentWindowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (!i && currentWindowWidth < 1200) {
      newDiv.style.marginTop = "12px";
    }

    // Create the label element
    const label = document.createElement("label");
    label.setAttribute("for", "team");
    label.textContent = currentTypes[i].name; // Label text

    // Create the input radio element
    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("id", "team");
    checkInput.setAttribute("name", "status");
    checkInput.setAttribute("value", "team");
    checkInput.setAttribute("checked", currentTypes[i].checked);
    checkInput.style.cursor = "pointer";

    // Create the img element
    const img = document.createElement("img");
    img.setAttribute("src", "/static/img/company_detail/checked_icon.svg");
    img.setAttribute("width", "16px");
    img.setAttribute("height", "16px");
    img.setAttribute("id", "company_detail_filter_checkbox");
    img.setAttribute("alt", "companies_radio_icon");

    if(!currentTypes[i].checked){
      newDiv.classList.add("cmp_filter_checked_checkbox_div");
      img.style.display = "none";
    }

    // Append the elements in the right order
    newDiv.appendChild(label);
    newDiv.appendChild(checkInput);
    newDiv.appendChild(img);

    checkInput.addEventListener("click", () => {
      currentTypes[i].checked = !currentTypes[i].checked;
      return FilterDropdown(event, false);
    });

    cmp_det_comment_filter_dropdown_types.appendChild(newDiv);
  }

  if(bool){
    FilterDropdownOpenClose();
  }
}

cmp_det_comment_filter_dropdown.addEventListener(
  "click",
  FilterDropdownOpenClose
);
