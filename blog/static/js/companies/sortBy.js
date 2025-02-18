const loadQueryToDOM = () => {
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const filterInputs = getUrlParams(); // Get current query parameters


  radioButtons.forEach((button) => {
    if(!filterInputs.sort_by){
        if(button.id === "totalScore"){
            button.checked = true
            button.parentElement.style = 'background: var(--Blue, #BDD4FA);'
        }
    }

    if (button.value === filterInputs.sort_by) {
      button.checked = true;
      button.parentElement.style = 'background: var(--Blue, #BDD4FA);'
    }
  });

  // radioButtons.forEach((button) => {
  //   const parentDiv = button.parentElement;

  //   if (filterInputs.sort_by && button.value === filterInputs.sort_by) {
  //     button.checked = true;
  //     parentDiv.style.background = "var(--Blue, #BDD4FA)"; // Apply active background
  //   } else {
  //     button.checked = false;
  //     parentDiv.style.background = ""; // Reset background if not selected
  //   }
  // });
};

// Run on page load
document.addEventListener("DOMContentLoaded", loadQueryToDOM);



// Handle sorting & toggling
const handleSort = (id) => {
  const filterInputs = getUrlParams(); // Get current query parameters
  const sortBtn = document.getElementById(id); // Get the clicked radio button

  if (!sortBtn) return; // Safety check

  const allButtons = document.querySelectorAll("input[type='radio']");
  
  if (filterInputs.sort_by === id) {
    // ✅ If the same button is clicked, uncheck & remove from URL
    filterInputs.sort_order = filterInputs.sort_order === "desc" ? "asc" : "desc";
  } else {
    // ✅ Otherwise, update the sorting parameter
    filterInputs.sort_by = id;
    filterInputs.sort_order = "asc";
  }

  // ✅ Update background styling
  allButtons.forEach((btn) => {
    btn.parentElement.style.background = btn.checked ? "var(--Blue, #BDD4FA)" : "";
  });

  console.log(filterInputs, "Updated filter inputs");

  // ✅ Update the URL & reload the page
  const newUrl = buildUrlFromParams(filterInputs);
  history.replaceState(null, null, newUrl);
  window.location.reload();
};

// const radioButtons = document.querySelectorAll('input[type="radio"]');

// radioButtons.forEach((button) => {
//   button.addEventListener("change", function () {
//     const filterInputs = getUrlParams();

//     console.log(filterInputs,'qqqqqqqq');
//     if (this.checked) {
//       filterInputs.sort_by = this.value;
//     } else {
//       if (filterInputs.sort_by) {
//         delete filterInputs.sort_by;
//       }
//     }

//     console.log(filterInputs,'asdasddaaasdasdads');

//     let urlWithQuery = buildUrlFromParams(filterInputs);
//     history.replaceState(null, null, urlWithQuery);
//     window.location.reload();
//   });
// });
