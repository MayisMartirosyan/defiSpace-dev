const dropdownFilterTypes = [
  {
    type: "All comments",
    items: [],
  },
  {
    type: "Team",
    items: ["Decentralization", "Activity"],
  },
  {
    type: "Product",
    items: ["Monthly active users", "APY 1 year", "APY 5 years"],
  },
  {
    type: "Security",
    items: ["Asset secured", "Max supply", "Liquidity"],
  },
];

const cmp_det_comment_filter_dropdown = document.getElementById("cmp_det_comment_filter_dropdown");
const cmp_det_comment_filter_current = document.getElementById("cmp_det_comment_filter_current");
const cmp_det_comment_filter_dropdown_list = document.getElementById("cmp_det_comment_filter_dropdown_list");
const cmp_det_comment_filter_dropdown_types = document.getElementById("cmp_det_comment_filter_dropdown_types");

let currentTypeGroup = null;
let selectedSubcategories = new Set();
let dropdownOpen = false;

function updateURLFromSet() {
  const baseUrl = window.location.pathname;
  const filters = Array.from(selectedSubcategories).map(encodeURIComponent).join(',');
  const newUrl = filters ? `${baseUrl}?filter=${filters}` : baseUrl;
  window.history.replaceState({}, '', newUrl);
}

function reloadIfNeeded() {
  location.reload();
}

cmp_det_comment_filter_dropdown.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownOpen = !dropdownOpen;
  cmp_det_comment_filter_dropdown_list.style.display = dropdownOpen ? "block" : "none";
});

function renderSubcategoryCheckboxes(items) {
  cmp_det_comment_filter_dropdown_types.innerHTML = "";

  items.forEach((name) => {
    const div = document.createElement("div");
    div.className = "cmp_filter_checkbox_div";

    const label = document.createElement("label");
    label.innerText = name;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedSubcategories.has(name);
    checkbox.style.cursor = "pointer";

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedSubcategories.add(name);
      } else {
        selectedSubcategories.delete(name);
      }
      updateURLFromSet();
      reloadIfNeeded();
    });

    const img = document.createElement("img");
    img.src = "/static/img/company_detail/checked_icon.svg";
    img.width = 16;
    img.height = 16;
    img.alt = "check";
    img.style.display = checkbox.checked ? "inline" : "none";

    checkbox.addEventListener("change", () => {
      img.style.display = checkbox.checked ? "inline" : "none";
    });

    div.appendChild(label);
    div.appendChild(checkbox);
    div.appendChild(img);
    cmp_det_comment_filter_dropdown_types.appendChild(div);
  });
}

dropdownFilterTypes.forEach((group) => {
  const groupBtn = document.getElementById(`filter-btn-${group.type.replace(/\s/g, "-")}`);
  if (groupBtn) {
    groupBtn.addEventListener("click", () => {
      cmp_det_comment_filter_current.innerText = group.type;

      if (group.type === "All comments") {
        selectedSubcategories.clear();
        updateURLFromSet();
        reloadIfNeeded();
        return;
      }

      currentTypeGroup = group;
      renderSubcategoryCheckboxes(group.items);

      dropdownOpen = false;
      cmp_det_comment_filter_dropdown_list.style.display = "none";
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filters = urlParams.get("filter");
  if (filters) {
    filters.split(',').forEach((f) => selectedSubcategories.add(decodeURIComponent(f)));
  }

  const match = dropdownFilterTypes.find((group) =>
    group.items?.some((item) => selectedSubcategories.has(item))
  );

  if (match) {
    currentTypeGroup = match;
    cmp_det_comment_filter_current.innerText = match.type;
    renderSubcategoryCheckboxes(match.items);
  } else {
    cmp_det_comment_filter_current.innerText = "All comments";
  }
});

document.getElementById('show_more_comments_btn')?.addEventListener('click', function () {
  const url = new URL(window.location.href);
  const currentPage = parseInt(url.searchParams.get('page') || '1', 10); 
  url.searchParams.set('page', currentPage + 1);
  window.location.href = url.toString();
});

window.addEventListener('beforeunload', function () {
  const commentsSection = document.getElementById('comments_section');
  if (commentsSection) {
    const offset = commentsSection.getBoundingClientRect().top + window.scrollY;
    sessionStorage.setItem('scroll_position', offset);
  }
});

window.addEventListener('load', function () {
  const scrollY = sessionStorage.getItem('scroll_position');
  if (scrollY !== null) {
    window.scrollTo({ top: parseInt(scrollY), behavior: 'instant' });
    sessionStorage.removeItem('scroll_position');
  }
});
