const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/constructionphase", (req, res) => {
  res.render("error/construction-phase", {
    title: "Yapım Aşaması",
  });
});

router.get(
  "/:category/:productcategory/:productid",
  userController.products_details
);

router.get("/:category/:productcategory", userController.products);

// Ana sayfaya gelen istek "/:category" rotasına yönlendirilir
router.get("/", userController.home_category);

router.get("/:category", userController.categories);

module.exports = router;
