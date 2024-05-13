//express modülleri
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const csurf = require("csurf");

//node modules
const path = require("path");

// routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// custom modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");
const log = require("./middlewares/log");
const error = require("./middlewares/error-handling");

//template engine
app.set("view engine", "ejs");

//models
const Section = require("./models/section");
const Product = require("./models/product");
const Headcategory = require("./models/headcategory");
const Productcategory = require("./models/productcategory");
const Splidecategory = require("./models/splidecategory");
const User = require("./models/user");
const Role = require("./models/role");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Session middleware'i eklendi
app.use(
  session({
    secret: "dfcbf928-cca3-4347-9c76-a725eea5d40f",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(locals);
app.use(csurf());

app.use("/css", express.static(path.join(__dirname, "public", "css"))); //tailwind css'in dosyası
app.use("/vendor", express.static(path.join(__dirname, "public", "vendor")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/static", express.static(path.join(__dirname, "public"))); //public klasörünü erişime açtık.
app.use("/partials", express.static(path.join(__dirname, "views", "partials"))); // Partials klasörü erişime açıldı
app.set("views", path.join(__dirname, "views"));

app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);
app.use("*", (req, res) => {
  res.status(404).render("error/404", { title: "not found" });
});
app.use(log);
app.use(error);

Headcategory.hasMany(Section, {
  foreignKey: {
    name: "headcategoryid",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdated: "CASCADE",
});

//* user işlemleri
// Section.belongsTo(User, {
//   foreignKey: {
//     allowNull: true
//   }
// });
// User.hasMany(Section);

Section.belongsTo(Headcategory, { foreignKey: "headcategoryid" });
Section.belongsTo(Productcategory, { foreignKey: "productcategoryid" });
Headcategory.hasMany(Product, {
  foreignKey: {
    name: "headcategoryid",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdated: "CASCADE",
});
Product.belongsTo(Headcategory, { foreignKey: "headcategoryid" });
Product.belongsTo(Productcategory, { foreignKey: "productcategoryid" });

Headcategory.hasMany(Splidecategory, {
  foreignKey: {
    name: "headcategoryid",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdated: "CASCADE",
});
Splidecategory.belongsTo(Headcategory, { foreignKey: "headcategoryid" });

Role.belongsToMany(User, { through: "userRoles" });
User.belongsToMany(Role, { through: "userRoles" });

(async () => {
  //alter yaparsan sadece değişen veriler güncellenir.
  // await sequelize.sync({ force: true });
  // await dummyData();
})();

app.listen(3000, function () {
  console.log("listening on port 3000");
});
