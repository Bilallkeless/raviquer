const express = require("express");
const router = express.Router();

const {
  sectionUpload,
  splideUpload,
  productUpload,
  productDetailUpload,
} = require("../helpers/image-upload");
const csrf = require("../middlewares/csrf");

const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/is-admin");
const isModerator = require("../middlewares/is-moderator");

// adminpanel endpoint'i
router.get("/adminpanel", (req, res) => {
  res.render("admin/adminpanel", {
    title: "Admin Panel",
  });
});

// admin/headcategory endpoint'i
router.get("/headcategory", (req, res) => {
  res.render("admin/headcategory", {
    title: "Genel Kategori",
  });
});

router.get("/productcategory", (req, res) => {
  res.render("admin/productcategory", {
    title: "Ürün Kategori",
  });
});

router.get("/splidecategory", (req, res) => {
  res.render("admin/splidecategory", {
    title: "Splide Kategori",
  });
});

router.get(
  "/section/delete/:sectionid",
  isModerator,
  csrf,
  adminController.get_section_delete
);

router.post(
  "/section/delete/:sectionid",
  isModerator,
  adminController.post_section_delete
);

router.get(
  "/product/delete/:productid",
  isModerator,
  csrf,
  adminController.get_product_delete
);

router.post(
  "/product/delete/:productid",
  isModerator,
  adminController.post_product_delete
);

//* categories Delete başlangıç
// Head Category Delete
router.get(
  "/headcategory/delete/:headcategoryid",
  isAdmin,
  csrf,
  adminController.get_headcategory_delete
);

router.post(
  "/headcategory/delete/:headcategoryid",
  isAdmin,
  adminController.post_headcategory_delete
);

// Product Category Delete
router.get(
  "/productcategory/delete/:productcategoryid",
  isAdmin,
  csrf,
  adminController.get_productcategory_delete
);

router.post(
  "/productcategory/delete/:productcategoryid",
  isAdmin,
  adminController.post_productcategory_delete
);

// Splide Category Delete
router.get(
  "/splidecategory/delete/:splidecategoryid",
  isAdmin,
  csrf,
  adminController.get_splidecategory_delete
);

router.post(
  "/splidecategory/delete/:splidecategoryid",
  isAdmin,
  adminController.post_splidecategory_delete
);

//* categories Delete bitiş

//* Create başlangıç

router.get(
  "/section/create",
  isModerator,
  csrf,
  adminController.get_section_create
);

router.post(
  "/section/create",
  isModerator,
  csrf,
  sectionUpload.single("resim"),
  adminController.post_section_create
);

router.get(
  "/product/create",
  isModerator,
  csrf,
  adminController.get_product_create
);

router.post(
  "/product/create",
  isModerator,
  csrf,
  productUpload.single("resim"),
  adminController.post_product_create
);

router.get(
  "/product/create-detail",
  isModerator,
  csrf,
  adminController.get_product_create_detail
);

router.post(
  "/product/create-detail",
  isModerator,
  productDetailUpload.fields([
    { name: "detayresim1", maxCount: 1 },
    { name: "detayresim2", maxCount: 1 },
    { name: "detayresim3", maxCount: 1 },
  ]),
  adminController.post_product_create_detail
);

//* Category Create başlangıç
router.get(
  "/headcategory/create",
  isAdmin,
  csrf,
  adminController.get_headcategory_create
);

router.post(
  "/headcategory/create",
  isAdmin,
  adminController.post_headcategory_create
);

router.get(
  "/productcategory/create",
  isAdmin,
  csrf,
  adminController.get_productcategory_create
);

router.post(
  "/productcategory/create",
  isAdmin,
  adminController.post_productcategory_create
);

router.get(
  "/splidecategory/create",
  isAdmin,
  csrf,
  adminController.get_splidecategory_create
);

router.post(
  "/splidecategory/create",
  isAdmin,
  splideUpload.single("resim"),
  adminController.post_splidecategory_create
);

//* Category Create Bitiş

//* Edit başlangıç

router.get(
  "/section/:sectionid",
  isModerator,
  csrf,
  adminController.get_section_edit
);

router.post(
  "/section/:sectionid",
  isModerator,
  sectionUpload.single("resim"), // Section yükleme yapısını kullan
  adminController.post_section_edit
);

router.get(
  "/product/:productid",
  isModerator,
  csrf,
  adminController.get_product_edit
);

router.post(
  "/product/:productid",
  isModerator,
  productUpload.single("resim"),
  adminController.post_product_edit
);

router.get(
  "/product/:productid/detail",
  isModerator,
  csrf,
  adminController.get_productDetail_edit
);

router.post(
  "/product/:productid/detail",
  isModerator,
  productDetailUpload.fields([
    { name: "detayresim1", maxCount: 1 },
    { name: "detayresim2", maxCount: 1 },
    { name: "detayresim3", maxCount: 1 },
  ]),
  adminController.post_productDetail_edit
);

//*categories edit başlangıç

router.get(
  "/headcategories/:headcategoryid",
  isAdmin,
  csrf,
  adminController.get_headcategory_edit
);

router.post(
  "/headcategories/:headcategoryid",
  isAdmin,
  adminController.post_headcategory_edit
);

router.get(
  "/productcategories/:productcategoryid",
  isAdmin,
  csrf,
  adminController.get_productcategory_edit
);

router.post(
  "/productcategories/:productcategoryid",
  isAdmin,
  adminController.post_productcategory_edit
);

router.get(
  "/splidecategories/:splidecategoryid",
  isAdmin,
  csrf,
  adminController.get_splidecategory_edit
);

router.post(
  "/splidecategories/:splidecategoryid",
  isAdmin,
  splideUpload.single("resim"),
  adminController.post_splidecategory_edit
);

//*categories edit bitiş

router.get("/sections", isModerator, adminController.get_sections);

router.get("/products", isModerator, adminController.get_products);

router.get("/headcategories", isAdmin, adminController.get_headcategories);

router.get(
  "/productcategories",
  isAdmin,
  adminController.get_productcategories
);

router.get("/splidecategories", isAdmin, adminController.get_splidecategories);

router.get("/roles", isAdmin, adminController.get_roles);

router.get("/roles/:roleid", csrf, isAdmin, adminController.get_role_edit);

router.post("/roles/remove", isAdmin, adminController.roles_remove);

router.post("/roles/:roleid", isAdmin, adminController.post_role_edit);

router.get("/users", isAdmin, adminController.get_user);

router.get("/users/:userid", isAdmin, csrf, adminController.get_user_edit);

router.post("/users/:userid", isAdmin, adminController.post_user_edit);

module.exports = router;
