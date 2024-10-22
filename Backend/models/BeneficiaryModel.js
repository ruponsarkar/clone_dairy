const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");

module.exports = {
  create(data, callback) {
    console.log("==>>", data);
    let insertQuery = `INSERT INTO beneficiaries(farmer_id, beneficiary_id, api_request_id, status)  VALUES ?`;
    let params = [];
    params.push(data.farmer_id);
    params.push(data.beneficiary_id);
    params.push(data.api_request_id);
    params.push(data.status);

    let message = {};
    db.query(insertQuery, [[params]], (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: "success"
        };
        callback && callback(message);
      } else {
        message = {
          status: 400,
          message: "failed",
        };
        callback && callback(message);
      }
    });
  },

  view(data, callback) {
    let query = `SELECT * FROM beneficiaries WHERE status = 'Active'`;
    db.query(query, (err, res) => {
      if (err) {
        return (
          callback &&
          callback({
            status: 500,
            message: "Error executing query: " + err,
            data: null,
          })
        );
      }

      // Check if any rows were returned
      if (res.length !== 0) {
        // Call the callback with success and the result data
        return (
          callback && callback({ status: 200, message: "Success", data: res })
        );
      } else {
        // Call the callback with success but no data
        return (
          callback && callback({ status: 200, message: "Success", data: [] })
        );
      }
    });
  },
};
