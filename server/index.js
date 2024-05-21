import express from "express";
import cors from "cors";
//import db from "./dbconfig/db.js";

import login from "./controllers/login.js";
import companiesForAdmin from "./controllers/companies-for-admin.js";
import companiesForUsers from "./controllers/companiesForUsers.js";
import deleteCompany from "./controllers/deleteCompany.js";
import updateCompany from "./controllers/updateCompany.js";
import updateCompanyDetails from "./controllers/updateCompanyDetails.js";
import companyById from "./controllers/companyById.js";
import addCompany from "./controllers/addCompany.js";

//initialize express application
const app = express();

app.use(express.json());

//enable cross domain requests
app.use(cors());

//middleware to check if it is admin or not

const isAdmin = (req, res, next) => {
  const { adminId } = req.body;
  if (!adminId) {
    res.status(403).json({ message: "Access denied. Admins only." });
  } else if (adminId !== 1) {
    res.status(403).json({ message: "Access denied. Admins only." });
  } else {
    next();
  }
};

//middleware for checking if it is a company
const isCompany = (req, res, next) => {
  const { RoleId } = req.body;
  if (!RoleId) {
    res.status(403).json({ message: "Access denied. Admins only." });
  } else if (RoleId !== 2) {
    res.status(403).json({ message: "Access denied. Admins only." });
  } else {
    next();
  }
};

//login for admin , company, user
app.post("/", login);

// add company by admin
app.post("/addCompany", isAdmin, addCompany);

//fetching all companies for admin
app.get("/companies-for-admin", companiesForAdmin);

//delete company by admin
app.delete("/deleteCompany/:companyId", deleteCompany);

//update company by admin
app.put("/updateCompany/:companyId", updateCompany);

//getting a specific company by company
app.get("/company/:companyId", companyById);

//update company by company
app.put("/updateDetails/:companyId", isCompany, updateCompanyDetails);

//getting all companies for normal users
app.get("/Ucompanies", companiesForUsers);

//starting server
app.listen(4000, (err, res) => {
  if (err) console.error(err);
  else console.log("server listening on port 4000");
});
