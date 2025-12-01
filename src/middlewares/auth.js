 const adminAuth  = (req, res, next) => {
    console.log("Admin auth is getting checked !!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    return res.status(401).send("Unauthorized Access");
  }else {
    next();
  }
}; 


module.exports = {adminAuth, };