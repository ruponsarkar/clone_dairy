const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const AdminModel = require("../models/AdminModel");

module.exports = {
  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    AdminModel.authenticate(email, password, (result) => {
      res.status(200).send(result);
    });
  },
  addOrUpdateAdmin(req, res) {
    let data = req.body.formData;
    AdminModel.addOrUpdateAdmin(data, (result) => {
      res.status(200).send(result);
    });
  },

  getAdmins(req, res) {
    AdminModel.getAdmins((result) => {
      res.status(200).send(result);
    });
  },

  createDCS(req, res) {
    let data = req.body.formData;
    let user = req.body.user;
    AdminModel.createDCS(data, user, (result) => {
      res.status(200).send(result);
    });
  },
  getAllDCS(req, res) {
    let user = req.body.user;
    AdminModel.getAllDCS(user, (result) => {
      res.status(200).send(result);
    });
  },
  getApplicationStatisticsData_DistrictWise(req, res) {
    let disctrict = req.body.param.disctrict;
    AdminModel.getApplicationStatisticsData_DistrictWise(
      disctrict,
      (result) => {
        res.status(200).send(result);
      }
    );
  },
  getApplicationStatisticsData_DCSWise(req, res) {
    let dcs = req.body.param.dcs;
    AdminModel.getApplicationStatisticsData_DCSWise(dcs, (result) => {
      res.status(200).send(result);
    });
  },
  getAllDCS_DistrictWise(req, res) {
    let disctrict = req.body.param.disctrict;
    AdminModel.getAllDCS_DistrictWise(disctrict, (result) => {
      res.status(200).send(result);
    });
  },
  createFolder(req, res) {
    let data = req.body.data;
    console.log("data=>> ", data);
    // return;
    AdminModel.createFolder(data, (result) => {
      res.status(200).send(result);
    });
  },

  upload_config_for_upload_docs: multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        // console.log(" ==>> ", req.body.id);
        let folderName = "documents";
        let dest = path.join(process.env.FILE_UPLOAD_PATH, folderName);

        console.log("dess", dest);

        module.exports.checkDirectory(dest, () => {
          callback(null, dest);
        });
      },
      filename: function (req, file, callback) {
        callback(null, req.body.fileName);
      },
    }),
  }),

  checkDirectory(directory, callback) {
    fs.stat(directory, (err, stats) => {
      if (
        err &&
        (err.errno === 34 || err.errno === -4058 || err.errno === -2)
      ) {
        fs.mkdir(directory, callback);
      } else {
        if (!err) {
          return callback && callback();
        }
        console.log(err);
      }
    });
  },

  // uploadDocuments

  uploadDocuments(req, res) {
    let filePath = path.join(process.env.FILE_UPLOAD_PATH, 'documents');
    filePath = path.join(filePath, req.body.fileName);

    let data = {
      name: req.body.originalName,
      type: "file",
      ref_id: req.body.ref_id,
      fileName: filePath,
      originalName: req.body.originalName,
      fileType: req.body.fileType,
      createdBy: req.body.createdBy,
      permissions: req.body.permissions
    };

    // console.log(data);
    // return;
    AdminModel.uploadDocuments(data, (result) => {
      res.status(200).send(result);
    });
  },


  updateDocuments(req, res) {
    let data = req.body.data

    console.log("data==>>", data);
    // return;
    AdminModel.updateDocuments(data, (result) => {
      res.status(200).send(result);
    });
  },



  getFillDocuments(req, res) {
    let ref_id = req.body.ref_id;
    console.log("ref_id : ", ref_id);
    // return;
    AdminModel.getFillDocuments(ref_id, (result) => {
      res.status(200).send(result);
    });
  },
};
