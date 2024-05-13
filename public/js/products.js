// script.js dosyası
window.addEventListener("load", function () {
  // Tüm size-button elemanlarını seç
  var sizeButtons = document.querySelectorAll(".size-button");

  // Her bir size-button elemanına tıklanma olayı ekleyin
  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Tüm size-button elemanlarından 'active' sınıfını kaldır
      sizeButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Tıklanan butona 'active' sınıfını ekle
      button.classList.add("active");
    });
  });
});
