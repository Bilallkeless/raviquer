module.exports = (err, req, res, next) => {
  console.log("loglama", err.message);
  // loglama veya email işlemi yapılabilir.
  next(err);
};
