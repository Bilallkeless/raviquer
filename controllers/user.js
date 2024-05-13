const Section = require("../models/section");
const Product = require("../models/product");
const Headcategory = require("../models/headcategory");
const Productcategory = require("../models/productcategory");
const Splidecategory = require("../models/splidecategory");

const { Op } = require("sequelize");

exports.products_details = async function (req, res) {
  const categorySlug = req.params.category;
  const productCategorySlug = req.params.productcategory;
  const productId = req.params.productid;

  try {
    // Headcategory bilgisini al
    const headCategory = await Headcategory.findOne({
      where: { category: categorySlug },
    });

    if (!headCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    // Productcategory bilgisini al
    const productCategory = await Productcategory.findOne({
      where: { productcategory: productCategorySlug },
    });

    if (!productCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    // Ürünü al
    const product = await Product.findOne({
      where: {
        headcategoryid: headCategory.headcategoryid,
        productcategoryid: productCategory.productcategoryid,
        productid: productId,
      },
    });

    // Tüm Headcategory'leri al
    const headCategories = await Headcategory.findAll();

    res.render("users/products-details", {
      title: "Ravique Türkiye | Online Alışveriş",
      product: product,
      headCategory: headCategory,
      productCategory: productCategory,
      headCategories: headCategories,
      selectedCategory: categorySlug,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.products = async function (req, res) {
  const categorySlug = req.params.category;
  const productCategorySlug = req.params.productcategory;

  try {
    // Headcategory bilgisini al
    const headCategory = await Headcategory.findOne({
      where: { category: categorySlug },
    });

    if (!headCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    // Productcategory bilgisini al
    const productCategory = await Productcategory.findOne({
      where: { productcategory: productCategorySlug },
    });

    if (!productCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    // Ürünleri al
    const products = await Product.findAll({
      where: {
        headcategoryid: headCategory.headcategoryid,
        productcategoryid: productCategory.productcategoryid,
      },
    });

    // Tüm Headcategory'leri al
    const headCategories = await Headcategory.findAll();

    res.render("users/products", {
      title: "Ravique Türkiye | Online Alışveriş",
      products: products,
      headCategory: headCategory,
      productCategory: productCategory,
      selectProductName: productCategory.name,
      headCategories: headCategories,
      selectedCategory: categorySlug,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.home_category = async function (req, res) {
  try {
    const defaultCategory = "kadin"; // Default kategori

    // Default kategoriye göre Headcategory'yi bul
    const headCategory = await Headcategory.findOne({
      where: { category: defaultCategory },
    });

    if (!headCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    const headCategoryId = headCategory.headcategoryid;

    // Sections'ı headcategoryid'ye göre al
    const sections = await Section.findAll({
      include: [
        {
          model: Productcategory,
          attributes: ["productcategory"],
        },
        {
          model: Headcategory,
          attributes: ["category"],
        },
      ],
      where: { headcategoryid: headCategoryId },
    });

    // SplideCategories'ı headcategoryid'ye göre al
    const splideCategories = await Splidecategory.findAll({
      include: [
        {
          model: Headcategory,
          attributes: ["category"],
        },
      ],
      where: {
        [Op.or]: [
          { headcategoryid: { [Op.ne]: headCategoryId } },
          { headcategoryid: null },
        ],
      },
    });

    // Tüm Headcategory'leri al
    const headCategories = await Headcategory.findAll();

    res.render("users/category", {
      title: "Ravique Türkiye | Online Alışveriş",
      sections: sections,
      headCategory: headCategory, // headCategory'yi view'a geçir
      headCategories: headCategories, // headCategories'i de view'a geçir
      selectedCategory: defaultCategory,
      splideCategories: splideCategories, // splideCategories'ı da view'a geçir
    });
  } catch (err) {
    console.log(err);
  }
};

exports.categories = async function (req, res) {
  const categorySlug = req.params.category;

  try {
    // Kategoriye göre Headcategory'yi bul
    const headCategory = await Headcategory.findOne({
      where: { category: categorySlug },
    });

    if (!headCategory) {
      return res.status(404).render("error/404", { title: "hata sayfası" });
    }

    const headCategoryId = headCategory.headcategoryid;

    // Sections'ı headcategoryid'ye göre al
    const sections = await Section.findAll({
      include: [
        {
          model: Productcategory,
          attributes: ["productcategory"],
        },
        {
          model: Headcategory,
          attributes: ["category"],
        },
      ],
      where: { headcategoryid: headCategoryId },
    });

    // SplideCategories'ı headcategoryid'ye göre al
    const splideCategories = await Splidecategory.findAll({
      include: [
        {
          model: Headcategory,
          attributes: ["category"],
        },
      ],
      where: {
        [Op.or]: [
          { headcategoryid: { [Op.ne]: headCategoryId } },
          { headcategoryid: null },
        ],
      },
    });

    // Tüm Headcategory'leri al
    const headCategories = await Headcategory.findAll();

    res.render("users/category", {
      title: "Ravique Türkiye | Online Alışveriş",
      sections: sections,
      headCategory: headCategory, // headCategory'yi view'a geçir
      headCategories: headCategories, // headCategories'i de view'a geçir
      selectedCategory: categorySlug,
      splideCategories: splideCategories, // splideCategories'ı da view'a geçir
    });
  } catch (err) {
    console.log(err);
  }
};
