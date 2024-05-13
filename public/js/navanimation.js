// Menü ikonunu seçme
const openBtn = document.getElementById("openBtn");

// Başlık kategorilerinin div'ini seçme
const headCategoriesDiv = document.querySelector(".head-categories");
const productHeadCategoriesDiv = document.querySelector(
  ".product-head-categories"
);
const adminPanel = document.querySelector(".admin-panel");

// Menü açma/kapatma işlevini belirleme
let isMenuOpen = false;

// Menü ikonuna tıklandığında çalışacak işlev
openBtn.addEventListener("click", () => {
  // Menü durumunu değiştirme
  isMenuOpen = !isMenuOpen;

  openBtn.classList.toggle("active");

  // head-categories için işlem
  if (headCategoriesDiv !== null) {
    if (isMenuOpen) {
      headCategoriesDiv.classList.remove("justify-center");
      headCategoriesDiv.classList.add("lg:ml-5");
    } else {
      headCategoriesDiv.classList.remove("lg:ml-5");
      headCategoriesDiv.classList.add("justify-center");
    }
  }

  // product-head-categories için işlem
  if (productHeadCategoriesDiv !== null) {
    if (isMenuOpen) {
      productHeadCategoriesDiv.classList.remove("hidden");
    } else {
      productHeadCategoriesDiv.classList.add("hidden");
    }
  }

  // adminPanel için işlem
  if (adminPanel !== null) {
    if (isMenuOpen) {
      adminPanel.classList.remove("hidden");
      adminPanel.classList.add("md:mx-20", "ml-4");
    } else {
      adminPanel.classList.remove("md:mx-20", "ml-4");
      adminPanel.classList.add("hidden");
    }
  }
});
