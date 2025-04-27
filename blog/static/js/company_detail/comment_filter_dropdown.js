const dropdownFilterTypes = [
  {
    type: "All comments",
    items: [],
  },
  {
    type: "Team",
    items: ["Decentralization", "Activity","Exposure"],
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

// --- Helper Functions ---

function updateURLFromSet() {
  const baseUrl = window.location.pathname;
  const filters = Array.from(selectedSubcategories).map(encodeURIComponent).join(',');
  const newUrl = filters ? `${baseUrl}?filter=${filters}` : baseUrl;
  window.history.replaceState({}, '', newUrl);
}

function reloadComments() {
  const url = window.location.href;

  fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newCommentsSection = doc.getElementById("comments_section");

      if (newCommentsSection) {
        const currentCommentsSection = document.getElementById("comments_section");
        currentCommentsSection.innerHTML = newCommentsSection.innerHTML;

        const newShowMoreDiv = doc.querySelector(".cmp_det_show_more_comments_div");
        const currentShowMoreDiv = document.querySelector(".cmp_det_show_more_comments_div");

        if (newShowMoreDiv && currentShowMoreDiv) {
          currentShowMoreDiv.innerHTML = newShowMoreDiv.innerHTML;
        } else if (!newShowMoreDiv && currentShowMoreDiv) {
          currentShowMoreDiv.remove();
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching comments:', error);
    });
}



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

    const img = document.createElement("img");
    img.src = "/static/img/company_detail/checked_icon.svg";
    img.width = 16;
    img.height = 16;
    img.alt = "check";
    img.style.display = checkbox.checked ? "inline" : "none";

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedSubcategories.add(name);
      } else {
        selectedSubcategories.delete(name);
      }

      img.style.display = checkbox.checked ? "inline" : "none";

      if (selectedSubcategories.size === 0) {
        window.history.replaceState({}, '', window.location.pathname);
      } else {
        updateURLFromSet();
      }
      reloadComments();
    });

    div.appendChild(label);
    div.appendChild(checkbox);
    div.appendChild(img);
    cmp_det_comment_filter_dropdown_types.appendChild(div);
  });
}

const redrawFiltration = () => {
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
}

// --- Event Listeners ---

cmp_det_comment_filter_dropdown.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownOpen = !dropdownOpen;
  cmp_det_comment_filter_dropdown_list.style.display = dropdownOpen ? "block" : "none";
});

dropdownFilterTypes.forEach((group) => {
  const groupBtn = document.getElementById(`filter-btn-${group.type.replace(/\s/g, "-")}`);
  if (groupBtn) {
    groupBtn.addEventListener("click", () => {
      cmp_det_comment_filter_current.innerText = group.type;

      if (group.type === "All comments") {
        selectedSubcategories.clear();
        updateURLFromSet();
        reloadComments();
        cmp_det_comment_filter_dropdown_types.innerHTML = "";
        return;
      }

      // auto-select all subcategories immediately
      selectedSubcategories = new Set(group.items);

      currentTypeGroup = group;
      renderSubcategoryCheckboxes(group.items);

      updateURLFromSet();
      reloadComments();

      dropdownOpen = false;
      cmp_det_comment_filter_dropdown_list.style.display = "none";
    });
  }
});




window.addEventListener("DOMContentLoaded", () => {
  redrawFiltration()
});

// --- Show more comments (pagination) ---
document.getElementById('show_more_comments_btn')?.addEventListener('click', function () {
  const url = new URL(window.location.href);
  const currentPage = parseInt(url.searchParams.get('page') || '1', 10); 
  url.searchParams.set('page', currentPage + 1);

  fetch(url.toString(), {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newCommentsSection = doc.getElementById("comments_section");

      if (newCommentsSection) {
        const currentCommentsSection = document.getElementById("comments_section");
        currentCommentsSection.innerHTML += newCommentsSection.innerHTML;
      }

      const newShowMoreDiv = doc.querySelector(".cmp_det_show_more_comments_div");
      const currentShowMoreDiv = document.querySelector(".cmp_det_show_more_comments_div");

      if (newShowMoreDiv && currentShowMoreDiv) {
        currentShowMoreDiv.innerHTML = newShowMoreDiv.innerHTML;
      } else if (!newShowMoreDiv && currentShowMoreDiv) {
        currentShowMoreDiv.remove();
      }
    })
    .catch((error) => {
      console.error('Error fetching more comments:', error);
    });
});

// --- Click subcategory stats to filter ---
document.querySelectorAll('.company_ratings_card_stats_comment').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.stopPropagation();

    const subcategoryText = element.getAttribute('data-subcategory');
    if (!subcategoryText) {
      console.error('No subcategory found on clicked element');
      return;
    }

    selectedSubcategories = new Set([subcategoryText]);

    updateURLFromSet();
    reloadComments();
    redrawFiltration()

    const commentsSection = document.getElementById('comments_section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



// --- Save Scroll Position ---
window.addEventListener('beforeunload', function () {
  const commentsSection = document.getElementById('comments_section');
  if (commentsSection) {
    const offset = commentsSection.getBoundingClientRect().top + window.scrollY;
    sessionStorage.setItem('scroll_position', offset);
  }
});

// --- Restore Scroll Position ---
window.addEventListener('load', function () {
  const scrollY = sessionStorage.getItem('scroll_position');
  if (scrollY !== null) {
    window.scrollTo({ top: parseInt(scrollY), behavior: 'instant' });
    sessionStorage.removeItem('scroll_position');
  }
});

