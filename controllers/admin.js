const Section = require("../models/section");
const Product = require("../models/product");
const Headcategory = require("../models/headcategory");
const Productcategory = require("../models/productcategory");
const Splidecategory = require("../models/splidecategory");
const Role = require("../models/role");
const User = require("../models/user");

const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const fs = require("fs");
const sequelize = require("../data/db");

exports.get_section_delete = async function (req, res) {
  const sectionid = req.params.sectionid;

  try {
    const section = await Section.findByPk(sectionid);

    if (section) {
      return res.render("admin/section-delete", {
        title: "Delete Section",
        section: section,
      });
    }
    res.redirect("/admin/sections");
  } catch (err) {
    console.log(err);
  }
};

exports.post_section_delete = async function (req, res) {
  const sectionid = req.body.sectionid;
  try {
    const section = await Section.findByPk(sectionid);
    if (section) {
      await section.destroy();
      return res.redirect("/admin/sections?action=delete");
    }
    res.redirect("/admin/sections");
  } catch (err) {
    console.log(err);
  }
};

exports.get_product_delete = async function (req, res) {
  const productid = req.params.productid;

  try {
    const product = await Product.findByPk(productid);

    if (product) {
      return res.render("admin/product-delete", {
        title: "Delete Product",
        product: product,
      });
    }
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.post_product_delete = async function (req, res) {
  const productid = req.body.productid;
  try {
    const product = await Product.findByPk(productid);
    if (product) {
      await product.destroy();
      res.redirect("/admin/products?action=delete");
    }
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.get_headcategory_delete = async function (req, res) {
  const headcategoryid = req.params.headcategoryid;

  try {
    const headCategory = await Headcategory.findByPk(headcategoryid);

    res.render("admin/headcategory-delete", {
      title: "Delete Head Category",
      headCategory: headCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_headcategory_delete = async function (req, res) {
  const headcategoryid = req.body.headcategoryid;
  try {
    const headCategory = await Headcategory.findByPk(headcategoryid);
    if (headCategory) {
      await headCategory.destroy();
      res.redirect("/admin/headcategories?action=delete");
    } else {
      res.redirect("/admin/headcategories");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_productcategory_delete = async function (req, res) {
  const productcategoryid = req.params.productcategoryid;

  try {
    const productCategory = await Productcategory.findByPk(productcategoryid);

    res.render("admin/productcategory-delete", {
      title: "Delete Product Category",
      productCategory: productCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_productcategory_delete = async function (req, res) {
  const productcategoryid = req.body.productcategoryid;
  try {
    const productCategory = await Productcategory.findByPk(productcategoryid);
    if (productCategory) {
      await productCategory.destroy();
      res.redirect("/admin/productcategories?action=delete");
    } else {
      res.redirect("/admin/productcategories");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_splidecategory_delete = async function (req, res) {
  const splidecategoryid = req.params.splidecategoryid;

  try {
    const splideCategory = await Splidecategory.findByPk(splidecategoryid);

    res.render("admin/splidecategory-delete", {
      title: "Delete Splide Category",
      splideCategory: splideCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_splidecategory_delete = async function (req, res) {
  const splidecategoryid = req.body.splidecategoryid;
  try {
    const splideCategory = await Splidecategory.findByPk(splidecategoryid);
    if (splideCategory) {
      await splideCategory.destroy();
      res.redirect("/admin/splidecategories?action=delete");
    } else {
      res.redirect("/admin/splidecategories");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_section_create = async function (req, res) {
  try {
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    res.render("admin/section-create", {
      title: "Add Section",
      categories: categories,
      productcategories: productcategories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_section_create = async function (req, res) {
  const baslik = req.body.baslik;
  const aciklama = req.body.aciklama;
  const fiyat = req.body.fiyat;
  const kategori = req.body.kategori;
  const urunkategori = req.body.urunkategori;
  let resim = "";

  try {
    if (baslik == "") {
      throw new Error("Başlık boş geçilemez");
    }

    if (baslik.length < 5 || baslik.length > 20) {
      throw new Error("Başlık 5-20 karakter aralığında olmalıdır");
    }

    if (aciklama == "") {
      throw new Error("Açıklama boş geçilemez");
    }

    if (kategori == "-1") {
      throw new Error("Kategori seçilmelidir");
    }

    if (urunkategori == "-1") {
      throw new Error("Ürün kategorisi seçilmelidir");
    }

    if (req.file) {
      resim = req.file.filename;

      fs.unlink("./public/images/" + req.body.resim, (err) => {
        console.log(err);
      });
    }

    await Section.create({
      baslik: baslik,
      aciklama: aciklama,
      fiyat: fiyat,
      resim: resim,
      headcategoryid: kategori,
      productcategoryid: urunkategori,
    });
    res.redirect("/admin/sections?action=create");
  } catch (err) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage += err.message;

      res.render("admin/section-create", {
        title: "Add Section",
        categories: await Headcategory.findAll(),
        productcategories: await Productcategory.findAll(),
        message: {
          text: errorMessage,
          class: "text-white p-4 rounded-lg shadow-md mb-4 bg-red-600",
        },
        values: {
          baslik: baslik,
          aciklama: aciklama,
          fiyat: fiyat,
        },
      });
    }
  }
};

exports.get_product_create = async function (req, res) {
  try {
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    res.render("admin/product-create", {
      title: "Add Product",
      categories: categories,
      productcategories: productcategories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_product_create = async function (req, res) {
  const { kategori, urunkategori, urunismi, fiyat, urunaciklama } = req.body;
  let resim = "";
  try {
    if (kategori == "-1") {
      throw new Error("Kategori seçilmelidir");
    }

    if (urunkategori == "-1") {
      throw new Error("Ürün kategorisi seçilmelidir");
    }

    if (urunismi == "") {
      throw new Error("Ürün ismi boş geçilemez");
    }

    if (fiyat == "") {
      throw new Error("Fiyat boş geçilemez");
    }

    if (urunaciklama.length < 5 || urunaciklama.length > 100) {
      throw new Error("Ürün açıklaması 5-100 karakter aralığında olmalıdır");
    }

    if (req.file) {
      resim = req.file.filename;
    }

    const headCategory = await Headcategory.findOne({
      where: { category: kategori },
    });
    const productCategory = await Productcategory.findOne({
      where: { productcategory: urunkategori },
    });

    const product = await Product.create({
      headcategoryid: headCategory.headcategoryid,
      productcategoryid: productCategory.productcategoryid,
      urunismi: urunismi,
      fiyat: fiyat,
      urunaciklama: urunaciklama,
      resim: resim,
    });

    req.session.kategori = kategori;
    req.session.urunkategori = urunkategori;
    req.session.headCategoryId = headCategory.headcategoryid;
    req.session.productId = product.productid;

    res.redirect("/admin/product/create-detail");
  } catch (err) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.render("admin/product-create", {
      title: "Add Product",
      categories: await Headcategory.findAll(),
      productcategories: await Productcategory.findAll(),
      message: {
        text: errorMessage,
        class: "text-white p-4 rounded-lg shadow-md mb-4 bg-red-600",
      },
      values: {
        urunismi: urunismi,
        fiyat: fiyat,
      },
    });
  }
};

exports.get_product_create_detail = async function (req, res) {
  try {
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    res.render("admin/product-create-detail", {
      title: "Add Product Detail",
      categories: categories,
      productcategories: productcategories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_product_create_detail = async function (req, res) {
  try {
    const { detayresim1, detayresim2, detayresim3 } = req.files;

    await Product.update(
      {
        detayresim1: detayresim1[0].filename,
        detayresim2: detayresim2[0].filename,
        detayresim3: detayresim3[0].filename,
      },
      { where: { productid: req.session.productId } }
    );

    res.redirect("/admin/products?action=create");
  } catch (err) {
    console.log(err);
  }
};

exports.get_headcategory_create = async function (req, res) {
  try {
    res.render("admin/headcategory-create", {
      title: "Add Head Category",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_headcategory_create = async function (req, res) {
  let name = req.body.name;

  // Türkçe karakterleri uygun İngilizce karakterlere dönüştürme
  let turkishToEnglish = {
    ı: "i",
    İ: "I",
    ş: "s",
    Ş: "S",
    ğ: "g",
    Ğ: "G",
    ç: "c",
    Ç: "C",
    ü: "u",
    Ü: "U",
    ö: "o",
    Ö: "O",
  };

  // Türkçe karakterleri dönüştürme
  let category = name
    .toLowerCase()
    .replace(/[ıİşŞğĞçÇüÜöÖ]/g, function (match) {
      return turkishToEnglish[match];
    })
    .replace(/\s+/g, "-");

  try {
    await Headcategory.create({
      name: name,
      category: category,
    });
    res.redirect("/admin/headcategories?action=create");
  } catch (err) {
    console.log(err);
  }
};

exports.get_productcategory_create = async function (req, res) {
  try {
    res.render("admin/productcategory-create", {
      title: "Add Product Category",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_productcategory_create = async function (req, res) {
  let name = req.body.name;

  // Türkçe karakterleri uygun İngilizce karakterlere dönüştürme
  let turkishToEnglish = {
    ı: "i",
    İ: "I",
    ş: "s",
    Ş: "S",
    ğ: "g",
    Ğ: "G",
    ç: "c",
    Ç: "C",
    ü: "u",
    Ü: "U",
    ö: "o",
    Ö: "O",
  };

  // Türkçe karakterleri dönüştürme
  let productcategory = name
    .toLowerCase()
    .replace(/[ıİşŞğĞçÇüÜöÖ]/g, function (match) {
      return turkishToEnglish[match];
    })
    .replace(/\s+/g, "-");

  try {
    await Productcategory.create({
      name: name,
      productcategory: productcategory,
    });
    res.redirect("/admin/productcategories?action=create");
  } catch (err) {
    console.log(err);
  }
};

exports.get_splidecategory_create = async function (req, res) {
  try {
    const categories = await Headcategory.findAll();

    res.render("admin/splidecategory-create", {
      title: "Add Splide Category",
      categories: categories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_splidecategory_create = async function (req, res) {
  const name = req.body.name;
  const resim = req.file.filename;
  const headcategoryid = req.body.kategori;

  try {
    // Yeni splide kategorisi oluştur
    await Splidecategory.create({
      name: name,
      resim: resim,
      headcategoryid: headcategoryid,
    });
    res.redirect("/admin/splidecategories?action=create");
  } catch (err) {
    console.log(err);
  }
};

exports.get_section_edit = async function (req, res) {
  const sectionid = req.params.sectionid;
  try {
    const section = await Section.findByPk(sectionid);
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    if (section) {
      return res.render("admin/section-edit", {
        title: section.dataValues.baslik,
        section: section.dataValues,
        categories: categories,
        productcategories: productcategories,
      });
    }

    res.redirect("admin/sections");
  } catch (err) {
    console.log(err);
  }
};

exports.post_section_edit = async function (req, res) {
  const sectionid = req.body.sectionid;
  const baslik = req.body.baslik;
  const aciklama = req.body.aciklama;
  const fiyat = req.body.fiyat;
  let resim = req.body.resim;

  if (req.file) {
    resim = req.file.filename;

    fs.unlink("./public/images/section/" + req.body.resim, (err) => {
      console.log(err);
    });
  }
  const kategoriid = req.body.kategori;
  const urunkategoriid = req.body.urunkategori;

  try {
    const section = await Section.findByPk(sectionid);
    if (section) {
      section.baslik = baslik;
      section.aciklama = aciklama;
      section.fiyat = fiyat;
      section.resim = resim;
      section.kategoriid = kategoriid;
      section.urunkategoriid = urunkategoriid;

      await section.save();
      return res.redirect("/admin/sections?action=edit&sectionid=" + sectionid);
    }
    res.redirect("/admin/sections");
  } catch (err) {
    console.log(err);
  }
};

exports.get_product_edit = async function (req, res) {
  const productid = req.params.productid;
  try {
    const product = await Product.findOne({
      where: { productid },
      include: [
        { model: Headcategory, attributes: ["name", "category"] },
        { model: Productcategory, attributes: ["name", "productcategory"] },
      ],
    });
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    if (product) {
      req.session.kategori = product.headcategory.category;
      req.session.urunkategori = product.productcategory.productcategory;

      return res.render("admin/product-edit", {
        title: product.urunismi,
        product: product,
        categories: categories,
        productcategories: productcategories,
      });
    }

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.post_product_edit = async function (req, res) {
  const productid = req.body.productid;
  const kategori = req.body.kategori;
  const urunkategori = req.body.urunkategori;
  const urunismi = req.body.urunismi;
  const fiyat = req.body.fiyat;
  const urunaciklama = req.body.urunaciklama;
  let resim = req.body.resim;

  if (req.file) {
    resim = req.file.filename;

    fs.unlink(
      `./public/images/${kategori}/${urunkategori}/` + req.body.resim,
      (err) => {
        console.log(err);
      }
    );
  }

  try {
    await Product.update(
      {
        headcategoryid: req.body.headcategoryid,
        productcategoryid: req.body.productcategoryid,
        urunismi,
        fiyat,
        urunaciklama,
        resim,
      },
      { where: { productid } }
    );

    res.redirect("/admin/product/" + productid + "/detail");
  } catch (err) {
    console.log(err);
  }
};

exports.get_productDetail_edit = async function (req, res) {
  const productid = req.params.productid;
  try {
    const product = await Product.findOne({
      where: { productid },
      include: [
        { model: Headcategory, attributes: ["name", "category"] },
        { model: Productcategory, attributes: ["name", "productcategory"] },
      ],
    });
    const categories = await Headcategory.findAll();
    const productcategories = await Productcategory.findAll();

    if (product) {
      return res.render("admin/product-edit-detail", {
        title: product.urunismi,
        product: product,
        categories: categories,
        productcategories: productcategories,
      });
    }

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.post_productDetail_edit = async function (req, res) {
  let detayresim1 = req.body.detayresim1;
  let detayresim2 = req.body.detayresim2;
  let detayresim3 = req.body.detayresim3;
  const productid = req.params.productid;

  const kategori = req.session.kategori;
  const urunkategori = req.session.urunkategori;

  if (req.files && req.files.detayresim1) {
    detayresim1 = req.files.detayresim1[0].filename;
    fs.unlink(
      `./public/images/${kategori}/${urunkategori}/urundetay/` +
        req.body.detayresim1,
      (err) => {
        if (err) {
          console.log("Error deleting file: ", err);
        } else {
          console.log("File deleted successfully");
        }
      }
    );
  }
  if (req.files && req.files.detayresim2) {
    detayresim2 = req.files.detayresim2[0].filename;
    fs.unlink(
      `./public/images/${kategori}/${urunkategori}/urundetay/` +
        req.body.detayresim2,
      (err) => {
        if (err) {
          console.log("Error deleting file: ", err);
        } else {
          console.log("File deleted successfully");
        }
      }
    );
  }
  if (req.files && req.files.detayresim3) {
    detayresim3 = req.files.detayresim3[0].filename;
    fs.unlink(
      `./public/images/${kategori}/${urunkategori}/urundetay/` +
        req.body.detayresim3,
      (err) => {
        if (err) {
          console.log("Error deleting file: ", err);
        } else {
          console.log("File deleted successfully");
        }
      }
    );
  }

  try {
    await Product.update(
      { detayresim1, detayresim2, detayresim3 },
      { where: { productid } }
    );
    res.redirect("/admin/products?action=edit&productid=" + productid);
  } catch (err) {
    console.log(err);
  }
};

exports.get_headcategory_edit = async function (req, res) {
  const headcategoryid = req.params.headcategoryid;
  try {
    const headCategory = await Headcategory.findByPk(headcategoryid);
    const sections = await headCategory.getSections({
      include: {
        model: Headcategory, // İlişkili modelin adını belirt
        attributes: ["name"],
        where: {
          headcategoryid: Sequelize.col("Section.headcategoryid"), // Sequelize.col kullanımı
        },
      },
    });

    const countSection = await headCategory.countSections();

    if (headCategory) {
      return res.render("admin/headcategory-edit", {
        title: headCategory.dataValues.name,
        headCategory: headCategory.dataValues,
        sections: sections,
        countSection: countSection,
      });
    }

    res.redirect("/admin/headcategories");
  } catch (err) {
    console.log(err);
  }
};

exports.post_headcategory_edit = async function (req, res) {
  const headcategoryid = req.params.headcategoryid;
  const name = req.body.name;

  // Türkçe karakterleri uygun İngilizce karakterlere dönüştürme
  let turkishToEnglish = {
    ı: "i",
    İ: "I",
    ş: "s",
    Ş: "S",
    ğ: "g",
    Ğ: "G",
    ç: "c",
    Ç: "C",
    ü: "u",
    Ü: "U",
    ö: "o",
    Ö: "O",
  };

  // Türkçe karakterleri dönüştürme
  let category = name
    .toLowerCase()
    .replace(/[ıİşŞğĞçÇüÜöÖ]/g, function (match) {
      return turkishToEnglish[match];
    })
    .replace(/\s+/g, "-");

  try {
    const headcategory = await Headcategory.findByPk(headcategoryid);
    if (headcategory) {
      headcategory.name = name;
      headcategory.category = category;
      await headcategory.save();
      return res.redirect(
        "/admin/headcategories?action=edit&headcategoryid=" + headcategoryid
      );
    }
    res.redirect("/admin/headcategories");
  } catch (err) {
    console.log(err);
  }
};

exports.get_productcategory_edit = async function (req, res) {
  const productcategoryid = req.params.productcategoryid;
  try {
    const productCategory = await Productcategory.findByPk(productcategoryid);

    if (productCategory) {
      return res.render("admin/productcategory-edit", {
        title: productCategory.dataValues.name,
        productCategory: productCategory.dataValues,
      });
    }

    res.redirect("/admin/productcategories");
  } catch (err) {
    console.log(err);
  }
};

exports.post_productcategory_edit = async function (req, res) {
  const productcategoryid = req.params.productcategoryid;
  const name = req.body.name;

  // Türkçe karakterleri uygun İngilizce karakterlere dönüştürme
  let turkishToEnglish = {
    ı: "i",
    İ: "I",
    ş: "s",
    Ş: "S",
    ğ: "g",
    Ğ: "G",
    ç: "c",
    Ç: "C",
    ü: "u",
    Ü: "U",
    ö: "o",
    Ö: "O",
  };

  // Türkçe karakterleri dönüştürme
  let productcategory = name
    .toLowerCase()
    .replace(/[ıİşŞğĞçÇüÜöÖ]/g, function (match) {
      return turkishToEnglish[match];
    })
    .replace(/\s+/g, "-");

  try {
    const productcategories = await Productcategory.findByPk(productcategoryid);
    if (productcategories) {
      productcategories.name = name;
      productcategories.productcategory = productcategory;
      await productcategories.save();
      return res.redirect(
        "/admin/productcategories?action=edit&productcategoryid=" +
          productcategoryid
      );
    }
    res.redirect("/admin/headcategories");
  } catch (err) {
    console.log(err);
  }
};

exports.get_splidecategory_edit = async function (req, res) {
  const splidecategoryid = req.params.splidecategoryid;
  try {
    const splideCategory = await Splidecategory.findByPk(splidecategoryid);
    const categories = await Headcategory.findAll();

    if (splideCategory) {
      return res.render("admin/splidecategory-edit", {
        title: splideCategory.name,
        splideCategory: splideCategory,
        categories: categories,
      });
    }

    res.redirect("admin/splidecategories");
  } catch (err) {
    console.log(err);
  }
};

exports.post_splidecategory_edit = async function (req, res) {
  const splidecategoryid = req.params.splidecategoryid;
  const name = req.body.name;
  let resim = req.body.resim;

  if (req.file) {
    resim = req.file.filename;

    // Eski resmi sil
    fs.unlink("./public/images/splide-img/" + req.body.resim, (err) => {
      console.log(err);
    });
  }
  const headcategoryid = req.body.kategori; // headcategoryid'yi al

  try {
    const splideCategory = await Splidecategory.findByPk(splidecategoryid);
    if (splideCategory) {
      // Splide kategorisini güncelle
      splideCategory.name = name;
      splideCategory.resim = resim;
      splideCategory.headcategoryid = headcategoryid;
      await splideCategory.save();
      res.redirect(
        "/admin/splidecategories?action=edit&splidecategoryid=" +
          splidecategoryid
      );
    } else {
      res.redirect("/admin/splidecategories");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.get_sections = async function (req, res) {
  const isModerator = req.session.roles.includes("moderator");
  const isAdmin = req.session.roles.includes("admin");

  try {
    const sections = await Section.findAll({
      attributes: ["sectionid", "baslik", "resim"],
      include: {
        model: Headcategory,
        attributes: ["name"],
        where:
          isModerator && isAdmin
            ? {
                headcategoryid: Sequelize.col("Section.headcategoryid"), // headcategoryid koşulu burada
              }
            : null,
      },
    });

    res.render("admin/section-list", {
      title: "Section List",
      sections: sections,
      action: req.query.action,
      sectionid: req.query.sectionid,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_products = async function (req, res) {
  try {
    const products = await Product.findAll({
      attributes: ["productid", "urunismi", "resim"],
      include: [
        {
          model: Headcategory,
          attributes: ["name", "category"],
          where: { headcategoryid: Sequelize.col("Product.headcategoryid") },
        },
        {
          model: Productcategory,
          attributes: ["name", "productcategory"],
          where: {
            productcategoryid: Sequelize.col("Product.productcategoryid"),
          },
        },
      ],
    });

    res.render("admin/product-list", {
      title: "Product List",
      products: products,
      action: req.query.action,
      productid: req.query.productid,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_headcategories = async function (req, res) {
  try {
    const headCategories = await Headcategory.findAll();

    res.render("admin/headcategory-list", {
      title: "Head Category list",
      headCategories: headCategories,
      action: req.query.action,
      headcategoryid: req.query.headcategoryid,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_productcategories = async function (req, res) {
  try {
    const productCategories = await Productcategory.findAll();

    res.render("admin/productcategory-list", {
      title: "Product Category list",
      productCategories: productCategories,
      action: req.query.action,
      productcategoryid: req.query.productcategoryid,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_splidecategories = async function (req, res) {
  try {
    const splideCategories = await Splidecategory.findAll({
      attributes: ["splidecategoryid", "name", "resim"],
      include: {
        model: Headcategory,
        attributes: ["name"],
        where: {
          headcategoryid: Sequelize.col("splidecategory.headcategoryid"),
        },
      },
    });

    res.render("admin/splidecategory-list", {
      title: "Splide Category list",
      splideCategories: splideCategories,
      action: req.query.action,
      splidecategoryid: req.query.splidecategoryid,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_roles = async function (req, res) {
  try {
    const roles = await Role.findAll({
      attributes: {
        include: [
          "role.id",
          "role.rolename",
          [sequelize.fn("COUNT", sequelize.col("users.id")), "user_count"],
        ],
      },
      include: [{ model: User, attributes: ["id"] }],
      group: ["role.id"],
      raw: true,
      includeIgnoreAttributes: false,
    });

    res.render("admin/role-list", {
      title: "role list",
      roles: roles,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_role_edit = async function (req, res) {
  const roleid = req.params.roleid;
  try {
    const role = await Role.findByPk(roleid);
    const users = await role.getUsers();
    if (role) {
      return res.render("admin/role-edit", {
        title: role.rolename,
        role: role,
        users: users,
      });
    }
    res.redirect("admin/roles");
  } catch (err) {
    console.log(err);
  }
};

exports.post_role_edit = async function (req, res) {
  const roleid = req.body.roleid;
  const rolename = req.body.rolename;
  try {
    await Role.update(
      { rolename: rolename },
      {
        where: {
          id: roleid,
        },
      }
    );
    return res.redirect("/admin/roles");
  } catch (err) {
    console.log(err);
  }
};

exports.roles_remove = async function (req, res) {
  const roleid = req.body.roleid;
  const userid = req.body.userid;
  try {
    await sequelize.query(
      `delete from userroles where userId=${userid} and roleId=${roleid}`
    );

    return res.redirect("/admin/roles/" + roleid);
  } catch (err) {
    console.log(err);
  }
};

exports.get_user = async function (req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "fullname", "email"],
      include: {
        model: Role,
        attributes: ["rolename"],
      },
    });

    res.render("admin/user-list", {
      title: "user list",
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_user_edit = async function (req, res) {
  const userid = req.params.userid;
  try {
    const user = await User.findOne({
      where: { id: userid },
      include: { model: Role, attributes: ["id"] },
    });

    const roles = await Role.findAll();

    res.render("admin/user-edit", {
      title: "user edit",
      user: user,
      roles: roles,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_user_edit = async function (req, res) {
  const userid = req.body.userid;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const roleIds = req.body.roles;

  try {
    const user = await User.findOne({
      where: { id: userid },
      include: { model: Role, attributes: ["id"] },
    });

    if (user) {
      user.fullname = fullname;
      user.email = email;

      if (roleIds == undefined) {
        await user.removeRoles(user.roles);
      } else {
        await user.removeRoles(user.roles);
        const selectedRoles = await Role.findAll({
          where: {
            id: {
              [Op.in]: roleIds,
            },
          },
        });
        await user.addRoles(selectedRoles);
      }

      await user.save();
      return res.redirect("/admin/users");
    }
    return res.redirect("/admin/users");
  } catch (err) {
    console.log(err);
  }
};
