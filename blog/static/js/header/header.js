document.addEventListener("DOMContentLoaded", () => {
  const ticker = document.querySelector("#ticker");
  const header = document.getElementById("header");
  const filter_btn = document.querySelector(
    "#header_filter_btn_div, #tags_selector_div_mobile"
  );

  ////////////////// Active route //////////////////

  let nav_routes = document.getElementById("nav_routes");
  let btns = nav_routes.getElementsByClassName("nav_item");

  const currentUrl = window.location.pathname;

  for (let i = 0; i < btns.length; i++) {
    if (currentUrl === btns[i].children[0].getAttribute("href")) {
      btns[i].classList.add("nav_active");
      btns[i].children[0].children[0].style.color = "white";
    }

    if (btns[i].textContent.includes("News") && currentUrl.includes("/post")) {
      btns[i].classList.add("nav_active");
      btns[i].children[0].children[0].style.color = "white";
    }
    if (
      btns[i].textContent.includes("Invest") &&
      currentUrl.includes("/companies")
    ) {
      btns[i].classList.add("nav_active");
      btns[i].children[0].children[0].style.color = "white";
    }
  }
  let newsBtn = document.getElementById("nav_item_link_news");

  if (currentUrl.includes("/post")) {
    newsBtn.classList.add("nav_active");
    newsBtn.children[0].style.color = "white";
  }

  ////////////////// Scroll event //////////////////

  document.addEventListener("scroll", () => {
    let currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 10) {
      ticker.style.width = "0px";
      header.style.width = "auto";

      if (
        window.location.pathname == "/" ||
        window.location.pathname == "/companies/"
      ) {
        filter_btn.style.visibility = "visible";
      } else {
        filter_btn.style.visibility = "hidden";
      }

      for (let i = 0; i < btns.length; i++) {
        if (btns[i].className !== "nav_item nav_active") {
          btns[i].style.display = "none";
        }
      }
    } else {
      ticker.style.width = "100%";
      header.style.width = "100%";

      filter_btn.style.visibility = "hidden";

      for (let i = 0; i < btns.length; i++) {
        if (btns[i].className !== "nav_item nav_active") {
          btns[i].style.display = "flex";
        }
      }
    }

    prevScrollPos = currentScrollPos;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let nav_routes = document.getElementById("nav_routes");
  let btns = nav_routes.getElementsByClassName("nav_item");

  if (currentScrollPos > 10) {
    ticker.style.width = "0px";
    header.style.width = "auto";

    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/companies/"
    ) {
      filter_btn.style.visibility = "visible";
    } else {
      filter_btn.style.visibility = "hidden";
    }

    for (let i = 0; i < btns.length; i++) {
      if (btns[i].className !== "nav_item nav_active") {
        btns[i].style.display = "none";
      }
    }
  }
});
