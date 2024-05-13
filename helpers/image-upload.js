const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ürün için olan yükleme yapısı
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.body.kategori; // Kategori adı
    const productCategory = req.body.urunkategori; // Ürün kategorisi adı

    // Dizinleri oluştur
    const uploadPath = `./public/images/${category}/${productCategory}`;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// Ürün Detay için olan yükleme yapısı
const productDetailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.session.kategori; // Kategori adı
    const productCategory = req.session.urunkategori; // Ürün kategorisi adı

    // Dizinleri oluştur
    const uploadPath = `./public/images/${category}/${productCategory}/urundetay`;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// section için olan yükleme yapısı
const sectionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/section");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// splide-img için olan yükleme yapısı
const splideStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/splide-img");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// Ürün için olan yükleme nesnesi
const productUpload = multer({
  storage: productStorage,
});

// Ürün Detay için olan yükleme nesnesi
const productDetailUpload = multer({
  storage: productDetailStorage,
});

// section için olan yükleme nesnesi
const sectionUpload = multer({
  storage: sectionStorage,
});

// splide-img için olan yükleme nesnesi
const splideUpload = multer({
  storage: splideStorage,
});

module.exports = {
  productUpload: productUpload,
  productDetailUpload: productDetailUpload,
  sectionUpload: sectionUpload,
  splideUpload: splideUpload,
};
