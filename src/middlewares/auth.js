const adminAuth = (req, res, next) => {
  let token = "xyz";
  const isAuthenticated = token === "xyz";
  console.log("admin Auth");

  if (!isAuthenticated) {
    res.status(403).send("unAuthorized Access");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  let token = "xyz";
  const isAuthenticated = token === "xyz";
  console.log("user Auth");
  if (!isAuthenticated) {
    res.status(403).send("unAuthorized Access");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
