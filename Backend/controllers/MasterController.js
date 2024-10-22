const multer = require("multer");
const request = require("request");
const fs = require("fs");
const path = require("path");
const { application } = require("express");
const FormModel = require("../models/FormModel");
const MasterModel = require("../models/MasterModel");
const { log } = require("console");

module.exports = {
  saveToMaster(req, res) {
    let form = req.body.data;
    let user = req.body.user;

    MasterModel.saveToMaster(form, user, (result) => {
      res.status(200).send(result);
    });
  },

  getMaster(req, res) {
    // console.log("here==>> ", req.body.data);
    let data = req.body.data;
    // return;
    MasterModel.getMaster(data, (result) => {
      res.status(200).send(result);
    });
  },
  postMonthlyReport(req, res) {
    console.log("here==>> ", req.body.data);
    let data = req.body.data;
    let month = req.body.month;
    let amountPerLitter = req.body.amountPerLitter;
    let approveBy = req.body.approveBy;
    MasterModel.postMonthlyReport(data, month, amountPerLitter, approveBy, (result) => {
      res.status(200).send(result);
    });
  },

  updateMonthlyReport(req, res) {
    console.log("here==>> ", req.body.data);
    let data = req.body.data;
    let month = req.body.month;
    let amountPerLitter = req.body.amountPerLitter;
    let approveBy = req.body.approveBy;
    console.log("approveBy==>", approveBy);
    MasterModel.updateMonthlyReport(data, month, amountPerLitter, approveBy, (result) => {
      res.status(200).send(result);
    });
  },

  getMasterWithReport(req, res) {
    let month = req.body.month;
    let district = req.body.district;
    let user = req.body.user;
    MasterModel.getMasterWithReport(month, district, user, (result) => {
      res.status(200).send(result);
    });
  },
  getMonthlyReport(req, res) {
    let month = req.body.month;
    MasterModel.getMonthlyReport(month, (result) => {
      res.status(200).send(result);
    });
  },

  getRangeSubsidy(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let id = req.body.id;
    let role = req.body.role;
    MasterModel.getRangeSubsidy(from, to, id, role, (result) => {
      res.status(200).send(result);
    });
  },

  individualMonthlyReport(req, res) {
    let formData = req.body.formData;
    MasterModel.individualMonthlyReport(formData, (result) => {
      res.status(200).send(result);
    });
  },

  getIndividualMonthlyReport(req, res) {
    let id = req.body.id;
    MasterModel.getIndividualMonthlyReport(id, (result) => {
      res.status(200).send(result);
    });
  },
  saveGrievance(req, res) {
    let data = req.body.data;
    MasterModel.saveGrievance(data, (result) => {
      res.status(200).send(result);
    });
  },
  getGrievance(req, res) {
    MasterModel.getGrievance((result) => {
      res.status(200).send(result);
    });
  },
};
