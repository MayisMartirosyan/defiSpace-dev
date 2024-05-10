// const sort_items = document.getElementById("sort_options");

const loadQueryToDOM = () => {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const filterInputs = getUrlParams();

  radioButtons.forEach((button) => {

    if(!filterInputs.sort_by){
        if(button.id === "totalScore"){
            button.checked = true
        }
    }

    if (button.value === filterInputs.sort_by) {
      button.checked = true;
    }
  });
};

document.addEventListener("DOMContentLoaded", loadQueryToDOM);


const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach((button) => {
  button.addEventListener("change", function () {
    if (this.checked) {
      
      const filterInputs = getUrlParams();
      filterInputs.sort_by = this.value
      let urlWithQuery = buildUrlFromParams(filterInputs)
      history.replaceState(null, null, urlWithQuery);
      window.location.reload();
    }
  });
});
