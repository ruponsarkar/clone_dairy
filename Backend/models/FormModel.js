const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");

module.exports = {
  saveForm(form, callback) {
    console.log("==>>", form);
    let insertQuery = `INSERT INTO forms(applicationId, mobileNumber, name, fathersName, gender, dob, aadhaarNo, aadharMobile, pan_number, voterID, area, district, LAC, village, gaon_panchayat, block, pincode, police_station, name_of_co_operatice_society, addree_of_co_operatice_society, registration_no_of_co_operatice_society, bank_name, bank_account_holder_name, bank_account_no, ifsc_code, milk_production_per_month, status)  VALUES ?`;
    let id = uuid();
    let params = [];
    params.push(id);
    // params.push(form.applicationId);
    params.push(form.mobileNumber);
    params.push(form.name);
    params.push(form.fathersName);
    params.push(form.gender);
    params.push(form.dob);
    params.push(form.aadhaarNo);
    params.push(form.aadharMobile);
    params.push(form.pan_number);
    params.push(form.voterID);
    params.push(form.area);
    params.push(form.district);
    params.push(form.LAC);
    params.push(form.village);
    params.push(form.gaon_panchayat);
    params.push(form.block);
    params.push(form.pincode);
    params.push(form.police_station);
    params.push(form.name_of_co_operatice_society);
    params.push(form.addree_of_co_operatice_society);
    params.push(form.registration_no_of_co_operatice_society);
    params.push(form.bank_name);
    params.push(form.bank_account_holder_name);
    params.push(form.bank_account_no);
    params.push(form.ifsc_code);
    params.push(form.milk_production_per_month);
    params.push(form.status);

    let message = {};
    db.query(insertQuery, [[params]], (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: "success",
          applicationId: id,
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
  updateFilePath(applicationId, fileType, filePath, callback) {
    // console.log("applicationId, fileType, filePath :", applicationId, fileType, filePath);
    let updateQuery = "";
    switch (fileType) {
      case "passbook":
        updateQuery = `UPDATE farmers SET passbook = ? WHERE applicationId = ?`;
        break;
      case "panCard":
        updateQuery = `UPDATE farmers SET panCard = ? WHERE applicationId = ?`;
        break;
      case "aadhaarCard":
        updateQuery = `UPDATE farmers SET aadharCard = ? WHERE applicationId = ?`;
        break;
      case "arcs_drcs":
        updateQuery = `UPDATE farmers SET arcs_drcs = ? WHERE applicationId = ?`;
        break;
    }

    db.query(updateQuery, [filePath, applicationId], (err, result) => {
      if (!err) {
        callback && callback({ status: 200, message: "success" });
      } else {
        callback && callback({ status: 400, message: "success" });
      }
    });
  },
  getFormByMobileNumber(mobileNumber, callback) {
    let selectQuery = `SELECT * FROM forms WHERE mobileNumber = ? ;`;
    db.query(selectQuery, [mobileNumber], (err, res) => {
      if (!err) {
        if (res.length != 0) {
          return (
            callback &&
            callback({ status: 200, message: "success", data: res[0] })
          );
        } else {
          return (
            callback &&
            callback({ status: 200, message: "success", data: null })
          );
        }
      } else {
        return (
          callback && callback({ status: 200, message: "success", data: null })
        );
      }
    });
  },

  getFrom(data, callback) {
    console.log("FROM MODAL: ", data);
    let role = data.user.role;
    let district = data.user.district;
    let offset = data.offset;
    let limit = data.limit;
    let filterBy = data.filterBy;
    let filterData = data.filterData;
    console.log(
      "user=>: ",
      role,
      offset,
      limit,
      filterBy,
      filterData,
      district
    );

    let query = "";
    switch (role) {
      case "Super Admin":
        if (filterBy) {
          query = `SELECT * FROM forms WHERE ${filterBy} = '${filterData}'  ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("1=>", query);
        } else {
          query = `SELECT * FROM forms ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("2=>", query);
        }

        break;

      case "Admin":
        if (filterBy) {
          query = `SELECT * FROM forms WHERE ${filterBy} = '${filterData}' AND district= '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("3=>", query);
        } else {
          query = `SELECT * FROM forms WHERE district = '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("4=>", query);
        }

        break;

      default:
        if (filterBy) {
          query = `SELECT * FROM forms WHERE ${filterBy} = '${filterData}'  ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("1=>", query);
        } else {
          query = `SELECT * FROM forms ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("2=>", query);
        }
    }

    // return;
    // let query = `SELECT * FROM forms LIMIT ${limit} OFFSET ${offset}`;
    db.query(query, (err, res) => {
      if (err) {
        // Call the callback with an error response
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

  updateFormStatus(data, callback) {
    let status = data.status;
    let applicationId = data.applicationId;
    // let remark = data.remark;

    // if (remark) {
    //   updateQuery = `UPDATE forms SET status = ?, remark = ? WHERE applicationId = ?`;
    //   queryData = [status, remark, applicationId];
    // } else {
    updateQuery = `UPDATE farmers SET status = ? WHERE applicationId = ?`;
    queryData = [status, applicationId];
    // }

    db.query(updateQuery, queryData, (err, result) => {
      if (!err) {
        callback && callback({ status: 200, message: "success" });
      } else {
        callback && callback({ status: 400, message: "success" });
      }
    });
  },

  countStatus(user, callback) {
    console.log("user ==>", user);

    // Get the current month in 'YYYY-MM' format
    let currentMonth = new Date().toISOString().slice(0, 7);

    // Define your queries
    let queries = {
      dcs: `SELECT COUNT(*) AS count FROM dcs `,
      farmers: `SELECT COUNT(*) AS count FROM farmers `,
      tot_milk_amount: `SELECT SUM(litter) AS count FROM monthly_reports `,
      total_amount: `SELECT SUM(amount) AS count FROM monthly_reports `,
      current_month_milk: `SELECT SUM(litter) AS count FROM monthly_reports `,
    };

    // Modify queries if the user's role is 'dcs'
    if (user.role === "DCS") {
      queries.farmers += `JOIN dcs ON farmers.dcsID = dcs.uid WHERE dcs.uid = ${user.uid}`;
      queries.tot_milk_amount += ` 
    JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
    JOIN dcs ON dcs.uid = farmers.dcsID
     WHERE dcs.uid = ${user.uid}`;
      queries.total_amount += ` 
    JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
    JOIN dcs ON dcs.uid = farmers.dcsID
     WHERE dcs.uid = ${user.uid}`;
      queries.current_month_milk += ` 
     JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
     JOIN dcs ON dcs.uid = farmers.dcsID
     AND dcs.uid = ${user.uid}`;
    }

    if (user.role === "DLC") {
      queries.farmers += `JOIN dcs ON farmers.dcsID = dcs.uid WHERE dcs.dlc_id = ${user.uid}`;
      queries.tot_milk_amount += ` 
    JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
    JOIN dcs ON dcs.uid = farmers.dcsID
     WHERE dcs.dlc_id = ${user.uid}`;
      queries.total_amount += ` 
    JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
    JOIN dcs ON dcs.uid = farmers.dcsID
     WHERE dcs.dlc_id= ${user.uid}`;
      queries.current_month_milk += ` 
     JOIN farmers ON farmers.applicationId = monthly_reports.applicationId 
     JOIN dcs ON dcs.uid = farmers.dcsID
     AND dcs.dlc_id = ${user.uid}`;
    }

    queries.current_month_milk += ` WHERE month='${currentMonth}'`;

    if (user.district != 'All') {
      queries.dcs += `WHERE district ='${user.district}' AND status=1`;
    } else {
      queries.dcs += `WHERE status=1`;
    }

    // Execute all queries using promises
    let promises = Object.keys(queries).map((key) => {
      return new Promise((resolve, reject) => {
        db.query(queries[key], (err, result) => {
          if (err) {
            reject({ key: key, error: err });
          } else {
            resolve({ key: key, count: result[0].count });
          }
        });
      });
    });

    // Handle all promises
    Promise.all(promises)
      .then((results) => {
        // Transform the results into an object
        let statusCounts = {};
        results.forEach((result) => {
          statusCounts[result.key] = result.count;
        });

        // Return the results via callback
        callback && callback({ status: 200, message: statusCounts });
      })
      .catch((err) => {
        // Handle errors
        callback && callback({ status: 400, message: err });
      });
  },

  // createFarmer
  createFarmer(form, callback) {
    console.log("==>>", form);
    let insertQuery = `INSERT INTO farmers(dcsID, applicationId, mobileNumber, name, fathersName, gender, dob, aadhaarNo, aadharMobile, pan_number, voterID, area, district, LAC, village, gaon_panchayat, block, pincode, police_station, bank_name, bank_account_holder_name, bank_account_no, ifsc_code, milk_production_per_month, status)  VALUES ?`;
    let id = uuid();
    let params = [];
    params.push(form.dcsID);
    params.push(id);
    params.push(form.mobileNumber);
    params.push(form.name);
    params.push(form.fathersName);
    params.push(form.gender);
    params.push(form.dob);
    params.push(form.aadhaarNo);
    params.push(form.aadharMobile);
    params.push(form.pan_number);
    params.push(form.voterID);
    params.push(form.area);
    params.push(form.district);
    params.push(form.LAC);
    params.push(form.village);
    params.push(form.gaon_panchayat);
    params.push(form.block);
    params.push(form.pincode);
    params.push(form.police_station);
    params.push(form.bank_name);
    params.push(form.bank_account_holder_name);
    params.push(form.bank_account_no);
    params.push(form.ifsc_code);
    params.push(form.milk_production_per_month);
    params.push(form.status);

    let message = {};
    db.query(insertQuery, [[params]], (err, result) => {
      console.log(err);
      if (!err) {
        message = {
          status: 200,
          message: "success",
          applicationId: id,
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

  getAllFarmers(dsc, user, limit, offset, callback) {
    console.log("user ==> ", user);
    // let offset = "0";
    // let limit = "100";
    let query = `
        SELECT 
            farmers.*, 
            dcs.name AS dcs_name, 
            dcs.registration_no AS dcs_registration_no, 
            dcs.address AS dcs_address,
            dcs.status AS dcs_status,
            COUNT(*) OVER() AS total_count -- Adds the total count
        FROM 
            farmers
        JOIN 
            dcs ON farmers.dcsID = dcs.uid
    `;

    if (dsc) {
      query += ` WHERE dcs.uid = ?`;
    }

    if (user.role === "DLC") {
      query += ` WHERE dcs.dlc_id = ${user.uid}`;
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const params = [dsc].filter((param) => param !== undefined);

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        callback &&
          callback({
            status: 400,
            message: "failed",
            data: null,
          });
      } else {
        const totalCount = results.length > 0 ? results[0].total_count : 0;
        callback &&
          callback({
            status: 200,
            message: "success",
            data: results,
            totalCount: totalCount
          });
      }
    });
  },

  // searchFarmer
  // searchFarmer(dcsIds, registrationNos, callback) {
  searchFarmer(search, callback) {
    let query = `
            SELECT 
            farmers.*, 
            dcs.name AS dcs_name, 
            dcs.registration_no AS dcs_registration_no, 
            dcs.address AS dcs_address,
            dcs.status AS dcs_status
            FROM 
                farmers
            JOIN 
                dcs ON farmers.dcsID = dcs.uid
            WHERE 
                1 = 1
        `;

    const params = [];

    // Add filter for dcs.name using LIKE if provided
    if (search.dcs) {
      query += ` AND dcs.name LIKE ?`;
      params.push(`%${search.dcs}%`);
    }

    // Add filter for dcs.registration_no using LIKE if provided
    if (search.regno) {
      query += ` AND dcs.registration_no LIKE ?`;
      params.push(`%${search.regno}%`);
    }

    // Execute the query
    db.query(query, params, (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        callback && callback({ message: "success", data: result });
      }
    });
  },

  // dcsData
  dcsData(callback) {
    let query = `
        SELECT 
            d.district AS DISTRICT,
            COUNT(DISTINCT d.uid) AS TOTAL_DCS,
            COUNT(DISTINCT f.id) AS TOTAL_SHAREHOLDERS,
            SUM(mr.litter) AS TOTAL_MILK_SALE
        FROM 
            dcs d
        LEFT JOIN 
            farmers f ON d.uid = f.dcsID
        LEFT JOIN 
            monthly_reports mr ON f.applicationId = mr.applicationId

           
        GROUP BY 
            d.district
        ORDER BY 
            d.district ASC;
    `;

    db.query(query, (err, result) => {
      if (err) {
        console.log("Error executing query: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        callback && callback({ message: "success", data: result });
      }
    });
  },

  updateDaybook(data, callback) {
    console.log("data=> ", data);

    // First, check if the record with the same month and admin_id already exists
    let checkQuery = `SELECT * FROM documents WHERE month = ? AND admin_id = ?`;

    db.query(checkQuery, [data.month, data.admin_id], (checkErr, checkResult) => {
      if (checkErr) {
        callback && callback({
          status: 400,
          message: "Failed to check existing record"
        });
        return;
      }

      if (checkResult.length > 0) {
        // If record exists, update it
        let updateQuery = `UPDATE documents SET title = ?, type = ?, role = ?, month = ?, file = ? WHERE id = ?`;

        let updateValues = [
          data.title,
          data.type,
          data.role,
          data.month,
          data.filePath, // New file path to be updated
          checkResult[0].id // Use the id from the found record to update
        ];

        console.log("Update values ==========>>>>>", updateValues);

        db.query(updateQuery, updateValues, (updateErr, updateResult) => {
          if (updateErr) {
            console.log(updateErr);
            callback && callback({
              status: 400,
              message: "Failed to update record"
            });
          } else {
            callback && callback({
              status: 200,
              message: "Record updated successfully"
            });
          }
        });
      } else {
        // If record does not exist, insert a new one
        let insertQuery = `INSERT INTO documents (title, type, role, admin_id, file, month) VALUES (?, ?, ?, ?, ?, ?)`;

        let insertValues = [
          data.title,
          data.type,
          data.role,
          data.admin_id,
          data.filePath,
          data.month
        ];

        db.query(insertQuery, insertValues, (insertErr, insertResult) => {
          if (insertErr) {
            callback && callback({
              status: 400,
              message: "Failed to insert record"
            });
          } else {
            callback && callback({
              status: 200,
              message: "Record inserted successfully"
            });
          }
        });
      }
    });
  },


  getDocuments(data, callback) {

    // role, month, admin_id, 
    let query = `SELECT * FROM documents WHERE role = ? AND month = ? AND admin_id = ?`;

    let values = [data.role, data.month, data.admin_id];

    db.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        callback && callback({ status: 400, message: "Failed to retrieve documents", error: err });
      } else {
        callback && callback({ status: 200, message: "Documents retrieved successfully", data: results[0] });
      }
    });
  }


};
