const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");
const jwt = require("jsonwebtoken");

// data base create query (MySql)
// CREATE TABLE admins (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     mobileNumber VARCHAR(15),
//     email VARCHAR(100) UNIQUE,
//     role VARCHAR(50),
//     district VARCHAR(50),
//     password VARCHAR(255),
//     status ENUM('Active', 'Inactive') NOT NULL
//   );

module.exports = {
  authenticate(email, password, callback) {
    let selectQuery = `SELECT id, uid, name, mobileNumber, email, role, district FROM admins WHERE email=? AND password=? AND status='Active'`;
    let response = {};
    db.query(selectQuery, [email, password], (err, result) => {
      if (!err) {
        if (result.length >= 1) {
          response = {
            status: 200,
            authenticated: true,
            token: generateAccessToken(result[0].email),
            data: result[0],
            message: "Found",
          };
        } else {
          response = {
            status: 200,
            authenticated: false,
            data: [],
            message: "Not found",
          };
        }
        callback && callback(response);
      } else {
        response = {
          status: 400,
          authenticated: false,
          data: [],
          message: "Failed",
        };
        callback && callback(response);
      }
    });
  },

  addOrUpdateAdmin(form, callback) {
    console.log("form ==>", form);

    let insertQuery = `
  INSERT INTO admins (uid, name, mobileNumber, email, role, district, password, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    mobileNumber = VALUES(mobileNumber),
    role = VALUES(role),
    district = VALUES(district),
    password = VALUES(password),
    status = VALUES(status)
`;
    let uid = Date.now();

    let params = [
      uid,
      form.name,
      form.mobileNumber,
      form.email,
      form.role,
      form.district,
      form.password,
      form.status,
    ];

    let message = {};
    db.query(insertQuery, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        message = {
          status: 400,
          message: "failed",
        };
      } else {
        message = {
          status: 200,
          message: "success",
        };
      }
      callback && callback(message);
    });
  },

  getAdmins(callback) {
    let query = `SELECT * FROM admins`;
    let message = {};
    db.query(query, (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: result,
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

  createDCS(form, user, callback) {
    let uid = Date.now();

    let dcsQuery = `
    INSERT INTO dcs (uid, dlc_id, name, registration_no, district, address, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    let dcsparams = [
      uid,
      user.uid,
      form.name,
      form.registration_no,
      form.district,
      form.address,
      form.status,
    ];

    db.query(dcsQuery, dcsparams, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
          });
        return; // Exit early on error
      }

      let insertQuery = `
        INSERT INTO admins (uid, name, mobileNumber, email, role, district, password, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          name = VALUES(name),
          mobileNumber = VALUES(mobileNumber),
          role = VALUES(role),
          district = VALUES(district),
          password = VALUES(password),
          status = VALUES(status)
      `;
      let params = [
        uid,
        form.name,
        null,
        uid,
        "DCS",
        form.district,
        form.password,
        form.status,
      ];

      db.query(insertQuery, params, (err, result) => {
        let message = {};
        if (err) {
          console.error("Database error:", err);
          message = {
            status: 400,
            message: "failed",
          };
        } else {
          message = {
            status: 200,
            message: "success",
          };
        }
        callback && callback(message);
      });
    });
  },

  getAllDCS(user, callback) {
    let dlc_id = "";
    let query = "";
    if (user.role === "DLC") {
      console.log("uid", user.uid);
      dlc_id = user.uid;
      query = `
    SELECT * FROM dcs WHERE status = 1 AND dlc_id = ${dlc_id}
  `;
    } else {
      query = `
    SELECT * FROM dcs WHERE status = 1
  `;
    }

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },

  getApplicationStatisticsData_DistrictWise(district, callback) {
    let query = `SELECT * FROM forms WHERE district=?`;

    db.query(query, [district], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },
  getApplicationStatisticsData_DCSWise(dcs, callback) {
    try {
      let query = `SELECT * FROM forms WHERE registration_no_of_co_operatice_society=?`;
      db.query(query, [dcs], (err, results) => {
        if (err) {
          console.error("Database error:", err);
          callback &&
            callback({
              status: 400,
              message: "failed",
              data: null,
            });
        } else {
          callback &&
            callback({
              status: 200,
              message: "success",
              data: results,
            });
        }
      });
    } catch (error) {
      callback &&
        callback({
          status: 400,
          message: "failed",
          data: null,
        });
    }
  },
  getAllDCS_DistrictWise(district, callback) {
    let query = `SELECT * FROM dcs WHERE district=? AND status = 1`;

    db.query(query, [district], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },

  createFolder(data, callback) {
    console.log("data: ", data);

    let values = [];
    if (data.type === "folder") {
      values = [
        data.name,
        data.type,
        data.ref_id,
        null,
        null,
        null,
        data.createdBy,
        JSON.stringify(data.permissions),
        1,
      ];
    }

    let query = `INSERT INTO files (name, type, ref_id, fileName, originalName, fileType, createdBy, permissions, status) VALUES (?,?,?,?,?,?,?,?,?)`;

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },


  uploadDocuments(data, callback) {
    console.log("data===>>>", data);

    let values = [];
    if (data.type === "file") {
      values = [
        data.fileName,
        data.type,
        data.ref_id,
        data.fileName,
        data.originalName,
        data.fileType,
        data.createdBy,
        data.permissions,
        1,
      ];
    }

    // console.log("values =>", values);

    let query = `INSERT INTO files (name, type, ref_id, fileName, originalName, fileType, createdBy, permissions, status) VALUES (?,?,?,?,?,?,?,?,?)`;

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },

  getFillDocuments(ref_id, callback) {

    // let query = `SELECT * FROM files WHERE ref_id=? AND status = 1 ORDER BY type DESC`;

    let query = `
        SELECT files.*, admins.name AS approved_by, admins.role AS role 
        FROM files 
        LEFT JOIN admins ON admins.id = files.createdBy 
        WHERE files.ref_id = ? AND files.status = 1 
        ORDER BY files.type DESC
    `;

    db.query(query, [ref_id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
          });
      }
    });
  },

  updateDocuments(data, callback){
    console.log("data here ", JSON.stringify(data.permissions));
    let query = `UPDATE files
    SET permissions = '${JSON.stringify(data.permissions)}'
    WHERE id = ${data.id};`

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        callback &&
          callback({
            status: 200,
            message: "success",
            data: 'Updated',
          });
      }
    });
  }

  // updateFileDocument 


};

function generateAccessToken(username) {
  return jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
}
