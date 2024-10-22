const FormController = require("../controllers").FormController;
const AdminController = require("../controllers").AdminController;
const PaymentController = require("../controllers").PaymentController;
const MasterController = require("../controllers").MasterController;
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({ status: true, message: "Welcome to Milk Subsidy Dairy Assam" });
  });
  app.post("/saveForm", FormController.saveForm);
  app.post("/getFrom", FormController.getFrom);
  app.post("/upload", FormController.upload_config.single("file"), FormController.saveToDb);
  app.post("/getFormByMobileNumber",FormController.getFormByMobileNumber);
  app.post("/updateFormStatus",FormController.updateFormStatus);
  app.post("/countStatus",FormController.countStatus);
  
  app.post("/uploadDaybook", FormController.upload_config_for_daybook.single("file"), FormController.saveDaybook);
  app.post("/getDocuments",FormController.getDocuments);
  
  
  // Admin Panel API's
  app.post("/login", AdminController.login);
  app.post("/addOrUpdateAdmin", authenticateToken, AdminController.addOrUpdateAdmin);
  app.get("/getAdmins",authenticateToken, AdminController.getAdmins);
  
  // Payment API's
  
  app.post("/createBeneficiary", PaymentController.createBeneficiary);
  app.post("/viewBeneficiary", PaymentController.view);
  
  // Payment API's End
  
  
  
  app.post("/saveToMaster", MasterController.saveToMaster);
  app.post("/getMaster", MasterController.getMaster);
  app.post("/postMonthlyReport", MasterController.postMonthlyReport);
  app.post("/updateMonthlyReport", MasterController.updateMonthlyReport);
  app.post("/getMasterWithReport", MasterController.getMasterWithReport);
  app.post("/getMonthlyReport", MasterController.getMonthlyReport);
  app.post("/individualMonthlyReport", MasterController.individualMonthlyReport);
  app.post("/getIndividualMonthlyReport", MasterController.getIndividualMonthlyReport);
  app.post("/saveGrievance", MasterController.saveGrievance);
  app.post("/getGrievance", MasterController.getGrievance);
  
  app.post("/getRangeSubsidy", MasterController.getRangeSubsidy);
  
  app.post("/createDCS", AdminController.createDCS);
  app.post("/getAllDCS", AdminController.getAllDCS);
  app.post("/getApplicationStatisticsData_DistrictWise", AdminController.getApplicationStatisticsData_DistrictWise);
  app.post("/getApplicationStatisticsData_DCSWise", AdminController.getApplicationStatisticsData_DCSWise);
  app.post("/getAllDCS_DistrictWise", AdminController.getAllDCS_DistrictWise);
  app.post("/createFarmer", FormController.createFarmer);
  app.post("/getAllFarmers", FormController.getAllFarmers);
  app.post("/searchFarmer", FormController.searchFarmer);
  app.post("/dcsData", FormController.dcsData);
  app.post("/createFolder", AdminController.createFolder);
  app.post("/uploadDocuments", AdminController.upload_config_for_upload_docs.single("file"), AdminController.uploadDocuments);
  app.post("/getFillDocuments", AdminController.getFillDocuments);
  app.post("/updateDocuments", AdminController.updateDocuments);
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user;
    console.log("Authenticated user");
    next();
  })
}