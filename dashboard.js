const navItems = Array.from(document.querySelectorAll(".admin-nav-item"));
const panels = Array.from(document.querySelectorAll("[data-page-panel]"));

function showPage(page) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.pagePanel === page);
  });

  if (location.hash !== `#${page}`) {
    history.replaceState(null, "", `#${page}`);
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

const initialPage = location.hash.replace("#", "");
showPage(["coupon", "suncode"].includes(initialPage) ? initialPage : "coupon");
