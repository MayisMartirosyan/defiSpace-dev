const loadQueryToDOM = () => {
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const filterInputs = getUrlParams(); 


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


};


document.addEventListener("DOMContentLoaded", loadQueryToDOM);



const handleSort = (id) => {
  const filterInputs = getUrlParams(); 
  const sortBtn = document.getElementById(id); 

  if (!sortBtn) return; 

  const allButtons = document.querySelectorAll("input[type='radio']");
  
  if (filterInputs.sort_by === id) {

    filterInputs.sort_order = filterInputs.sort_order === "desc" ? "asc" : "desc";
  } else {

    filterInputs.sort_by = id;
    filterInputs.sort_order = "asc";
  }

  allButtons.forEach((btn) => {
    btn.parentElement.style.background = btn.checked ? "var(--Blue, #BDD4FA)" : "";
  });

  const newUrl = buildUrlFromParams(filterInputs);
  history.replaceState(null, null, newUrl);
  window.location.reload();
};

