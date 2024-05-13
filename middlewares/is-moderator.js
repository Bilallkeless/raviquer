module.exports = (req, res, next) => {
  if (!req.session.isAuth) {
    return res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }

  if (
    !req.session.roles.includes("admin") &&
    !req.session.roles.includes("moderator")
  ) {
    req.session.message = {
      url: "<p>Yetkili bir kullanıcı ile oturum açınız.</p>",
    };
    return res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }
  next();
};
