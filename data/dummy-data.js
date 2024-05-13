const Headcategory = require("../models/headcategory");
const Productcategory = require("../models/productcategory");
const Splidecategory = require("../models/splidecategory");
const Section = require("../models/section");
const Product = require("../models/product");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Role = require("../models/role");

async function populate() {
  const count = await Headcategory.count();

  if (count == 0) {
    const users = await User.bulkCreate([
      {
        fullname: "Bilal Keleş",
        email: "bilalkeles@raviquer.com",
        password: await bcrypt.hash("123456789", 10),
      },
      {
        fullname: "Ayşe Tutuk",
        email: "aysetutuk@raviquer.com",
        password: await bcrypt.hash("123456789", 10),
      },
      {
        fullname: "Emirhan Keleş",
        email: "emirhankeles@raviquer.com",
        password: await bcrypt.hash("123456789", 10),
      },
      {
        fullname: "Halil Keleş",
        email: "halilkeles@raviquer.com",
        password: await bcrypt.hash("123456789", 10),
      },
      {
        fullname: "Semih Kaya",
        email: "semihkaya@raviquer.com",
        password: await bcrypt.hash("123456789", 10),
      },
    ]);

    const roles = await Role.bulkCreate([
      { rolename: "admin" },
      { rolename: "moderator" },
      { rolename: "guest" },
    ]);

    await users[0].addRole(roles[0]); // admin => bilalkeles

    await users[1].addRole(roles[1]); // moderator => aysetutuk
    await users[2].addRole(roles[1]); // moderator => emirhankeles

    await users[3].addRole(roles[2]); // guest => halilkeles
    await users[4].addRole(roles[2]); // guest => semihkaya

    await Headcategory.bulkCreate([
      {
        name: "Kadın",
        category: "kadin",
      },
      {
        name: "Erkek",
        category: "erkek",
      },
      {
        name: "Teen",
        category: "teen",
      },
      {
        name: "Çocuk",
        category: "cocuk",
      },
    ]);

    await Productcategory.bulkCreate([
      {
        name: "Yeni Ürünler",
        productcategory: "yeni-urunler",
      },
      {
        name: "Sweatshirt",
        productcategory: "sweatshirt",
      },
      {
        name: "Teen Girl",
        productcategory: "teen-girl",
      },
      {
        name: "Teen Boy",
        productcategory: "teen-boy",
      },
      {
        name: "Kız Çocuk",
        productcategory: "cocuk-girl",
      },
      {
        name: "Erkek Çocuk",
        productcategory: "cocuk-boy",
      },
    ]);

    await Splidecategory.bulkCreate([
      {
        name: "Kadın",
        resim: "kadin-splide.jpg",
        headcategoryid: "1",
      },
      {
        name: "Erkek",
        resim: "erkek-splide.jpg",
        headcategoryid: "2",
      },
      {
        name: "Teen Girl",
        resim: "teengirl-splide-1712267089954.jpg",
        headcategoryid: "3",
      },
      {
        name: "Teen Boy",
        resim: "teenboy-splide-1712348341990.jpg",
        headcategoryid: "3",
      },
      {
        name: "Kız Çocuk",
        resim: "kizcocuk-splide-1711489284281.jpg",
        headcategoryid: "4",
      },
      {
        name: "Erkek Çocuk",
        resim: "erkekcocuk-splide-1711489262104.jpg",
        headcategoryid: "4",
      },
    ]);

    await Section.bulkCreate([
      {
        baslik: "Yeni Ürünler",
        aciklama: "Poplin gömlek",
        fiyat: "420,00 TL",
        resim: "kadin-section-1.jpg",
        headcategoryid: 1,
        productcategoryid: 1,
      },
      {
        baslik: "Sweatshirt",
        aciklama: "Basic Sweatshirt",
        fiyat: "340,00 TL",
        resim: "kadin-section-2-1712158025716.jpg",
        headcategoryid: 1,
        productcategoryid: 2,
      },
      {
        baslik: "Yeni Ürünler",
        aciklama: "Poplin gömlek",
        fiyat: "420,00 TL",
        resim: "erkek-section-1.jpg",
        headcategoryid: 2,
        productcategoryid: 1,
      },
      {
        baslik: "Sweatshirt",
        aciklama: "Basic Sweatshirt",
        fiyat: "340,00 TL",
        resim: "erkek-section-2-1712264975530.jpg",
        headcategoryid: 2,
        productcategoryid: 2,
      },
      {
        baslik: "Teen Girl",
        aciklama: "Kargo pantolon",
        fiyat: "590,00 TL",
        resim: "teen-section-1-1712347067240.jpg",
        headcategoryid: 3,
        productcategoryid: 3,
      },
      {
        baslik: "Teen Boy",
        aciklama: "Baskılı t-shirt",
        fiyat: "320,00 TL",
        resim: "teen-section-2.jpg",
        headcategoryid: 3,
        productcategoryid: 4,
      },
      {
        baslik: "Kız Çocuk",
        aciklama: "Cepli marine fit jean",
        fiyat: "530,00 TL",
        resim: "cocuk-section-1.jpg",
        headcategoryid: 4,
        productcategoryid: 5,
      },
      {
        baslik: "Erkek Çocuk",
        aciklama: "Denim gömlek",
        fiyat: "390,00 TL",
        resim: "cocuk-section-2.jpg",
        headcategoryid: 4,
        productcategoryid: 6,
      },
    ]);

    await Product.bulkCreate([
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Rustik Bluz",
        fiyat: "590,00 TL",
        urunaciklama:
          "Rustik kumaşlı, V yaka, uzun kollu, manşetleri lastikli, yakası hafif büzgülü bluz.",
        resim: "rustik-bluz-1.jpg",
        detayresim1: "rustik-bluz-1-1.jpg",
        detayresim2: "rustik-bluz-1-2.jpg",
        detayresim3: "rustik-bluz-1-3.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Çizgili Rustik Pantolon",
        fiyat: "890,00 TL",
        urunaciklama:
          "Önü kopçalı ve fermuarlı, kemer köprülü, çizgili, rustik pantolon.",
        resim: "cizgili-rustik-pantolon-1-1713870048389.jpg",
        detayresim1: "cizgili-rustik-pantolon-1-1-1713870058508.jpg",
        detayresim2: "cizgili-rustik-pantolon-1-2-1713870058508.jpg",
        detayresim3: "cizgili-rustik-pantolon-1-3-1713870058509.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Culotte Pantolon",
        fiyat: "890,00 TL",
        urunaciklama:
          "Rahat, hoş dokulu ve %100 pamuklu kumaştan, geniş paça jean.",
        resim: "culotte-pantolon-1715254894099.jpg",
        detayresim1: "culotte-pantolon1-1715254904708.jpg",
        detayresim2: "culotte-pantolon2-1715254904709.jpg",
        detayresim3: "culotte-pantolon3-1715254904709.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Büzgülü t-shirt",
        fiyat: "400,00 TL",
        urunaciklama:
          "Bisiklet yaka, kısa kollu, vücuda oturan top. Yanı büzgü detaylı.",
        resim: "buzgulu-tshirt-1-1715255703046.jpg",
        detayresim1: "buzgulu-tshirt-1-1-1715255730540.jpg",
        detayresim2: "buzgulu-tshirt-1-2-1715255730541.jpg",
        detayresim3: "buzgulu-tshirt-1-3-1715255730541.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Kısa kollu gömlek",
        fiyat: "590,00 TL",
        urunaciklama:
          "Hafif ve rahat bir kumaştan, önü düğmeli, kısa kollu crop gömlek.",
        resim: "kisa-kollu-gomlek-1-1715256255546.jpg",
        detayresim1: "kisa-kollu-gomlek-1-1-1715256296157.jpg",
        detayresim2: "kisa-kollu-gomlek-1-2-1715256296158.jpg",
        detayresim3: "kisa-kollu-gomlek-1-3-1715256296159.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Omuz kısmı düğümlü çanta",
        fiyat: "650,00 TL",
        urunaciklama: "Askısı düğüm detaylı, fermuarlı kol çantası.",
        resim: "dugumlu-canta-1-1715256623325.jpg",
        detayresim1: "dugumlu-canta-1-1-1715256636863.jpg",
        detayresim2: "dugumlu-canta-1-2-1715256636863.jpg",
        detayresim3: "dugumlu-canta-1-3-1715256636863.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Krepe midi etek",
        fiyat: "650,00 TL",
        urunaciklama:
          "Elastik belli uzun etek. Giysiye hareket katan bloklu bir tasarıma sahiptir.",
        resim: "krepe-midi-etek-1-1715256740725.jpg",
        detayresim1: "krepe-midi-etek-1-1-1715256748526.jpg",
        detayresim2: "krepe-midi-etek-1-2-1715256748527.jpg",
        detayresim3: "krepe-midi-etek-1-3-1715256748527.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 1,
        urunismi: "Çok bantlı topuklu sandalet",
        fiyat: "890,00 TL",
        urunaciklama:
          "İnce çapraz bantlı, kare burunlu, tokalı bilek bantlı, topuklu sandalet.",
        resim: "cok-bantli-sandalet-1-1715256827706.jpg",
        detayresim1: "cok-bantli-sandalet-1-1-1715256839467.jpg",
        detayresim2: "cok-bantli-sandalet-1-2-1715256839468.jpg",
        detayresim3: "cok-bantli-sandalet-1-3-1715256839468.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 2,
        urunismi: "Fermuarlı kapüşonlu sweatshirt",
        fiyat: "590,00 TL",
        urunaciklama:
          "Rahat kumaşlı, uzun kollu, önü fermuarlı, iki ön cepli eşofman üstü ceket.",
        resim: "fermuarli-kapusonlu-sweatshirt-1-1715257391472.jpg",
        detayresim1: "fermuarli-kapusonlu-sweatshirt-1-1-1715257417214.jpg",
        detayresim2: "fermuarli-kapusonlu-sweatshirt-1-2-1715257417214.jpg",
        detayresim3: "fermuarli-kapusonlu-sweatshirt-1-3-1715257417214.jpg",
      },
      {
        headcategoryid: 1,
        productcategoryid: 2,
        urunismi: "Barbie™ baskılı sweatshirt",
        fiyat: "720,00 TL",
        urunaciklama:
          "Bisiklet yaka, uzun kollu, yakası, manşetleri ve beli fitilli, çizgili sweatshirt.",
        resim: "barbie-baskili-sweatshirt-1-1715257657815.jpg",
        detayresim1: "barbie-baskili-sweatshirt-1-1-1715257714802.jpg",
        detayresim2: "barbie-baskili-sweatshirt-1-2-1715257714803.jpg",
        detayresim3: "barbie-baskili-sweatshirt-1-3-1715257714804.jpg",
      },
      {
        headcategoryid: 2,
        productcategoryid: 2,
        urunismi: "Baskılı sweatshirt",
        fiyat: "450,00 TL",
        urunaciklama:
          "Pamuklu bir kumaştan, uzun kollu, bisiklet yaka sweatshirt",
        resim: "baskili-sweatshirt-1-1715258360242.jpg",
        detayresim1: "baskili-sweatshirt-1-1-1715258368480.jpg",
        detayresim2: "baskili-sweatshirt-1-2-1715258368480.jpg",
        detayresim3: "baskili-sweatshirt-1-3-1715258368481.jpg",
      },
      {
        headcategoryid: 3,
        productcategoryid: 3,
        urunismi: "Yazılı bol sweatshirt",
        fiyat: "510,00 TL",
        urunaciklama:
          "Uzun kollu, kapüşonlu, önü yazı baskılı ve kanguru cepli, loose fit sweatshirt.",
        resim: "yazili-bol-sweatshirt-1-1715258638008.jpg",
        detayresim1: "yazili-bol-sweatshirt-1-1-1715258652212.jpg",
        detayresim2: "yazili-bol-sweatshirt-1-2-1715258652213.jpg",
        detayresim3: "yazili-bol-sweatshirt-1-3-1715258652214.jpg",
      },
      {
        headcategoryid: 3,
        productcategoryid: 4,
        urunismi: "Soluk efektli desenli t-shirt",
        fiyat: "450,00 TL",
        urunaciklama:
          "Soluk efektli bir kumaştan, önü baskılı, bisiklet yaka, kısa kollu t-shirt.",
        resim: "soluk-desen-tshirt-1-1715258851732.jpg",
        detayresim1: "soluk-desen-tshirt-1-1-1715258863801.jpg",
        detayresim2: "soluk-desen-tshirt-1-2-1715258863802.jpg",
        detayresim3: "soluk-desen-tshirt-1-3-1715258863803.jpg",
      },
      {
        headcategoryid: 4,
        productcategoryid: 5,
        urunismi: "Hafif denim elbise",
        fiyat: "450,00 TL",
        urunaciklama:
          "İnce askılı, elastik bisiklet yaka, bol kesim kısa elbise.",
        resim: "hafif-denim-elbise-1-1715259156613.jpg",
        detayresim1: "hafif-denim-elbise-1-1-1715259165410.jpg",
        detayresim2: "hafif-denim-elbise-1-2-1715259165410.jpg",
        detayresim3: "hafif-denim-elbise-1-3-1715259165411.jpg",
      },
      {
        headcategoryid: 4,
        productcategoryid: 6,
        urunismi: "Hakim yaka rustik gömlek",
        fiyat: "360,00 TL",
        urunaciklama: "%55 keten ve %45 pamuk içerikli kumaştan gömlek",
        resim: "hakim-rustik-gomlek-1-1715259287678.jpg",
        detayresim1: "hakim-rustik-gomlek-1-1-1715259296411.jpg",
        detayresim2: "hakim-rustik-gomlek-1-2-1715259296411.jpg",
        detayresim3: "hakim-rustik-gomlek-1-3-1715259296411.jpg",
      },
      {
        headcategoryid: 2,
        productcategoryid: 1,
        urunismi: "Koton t-shirt",
        fiyat: "450,00 TL",
        urunaciklama:
          "Pamuklu kumaştan, kısa kollu, bisiklet yaka, yakası ve kol uçları fitilli, hafif loose fit t-shirt.",
        resim: "koton-tshirt-1.jpg",
        detayresim1: "koton-tshirt-1-1.jpg",
        detayresim2: "koton-tshirt-1-2.jpg",
        detayresim3: "koton-tshirt-1-3.jpg",
      },
      {
        headcategoryid: 2,
        productcategoryid: 1,
        urunismi: "Baskılı t-shirt",
        fiyat: "550,00 TL",
        urunaciklama:
          "%100 pamuklu, önü ve arkası baskılı, bisiklet yaka, kısa kollu, hafif loose fit t-shirt.",
        resim: "baskili-tshirt-1-1715168938391.jpg",
        detayresim1: "baskili-tshirt-1-1-1715168949780.jpg",
        detayresim2: "baskili-tshirt-1-2-1715168949780.jpg",
        detayresim3: "baskili-tshirt-1-3-1715168949781.jpg",
      },
    ]);
  }
}

module.exports = populate;
