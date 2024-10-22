const { application } = require("express");
const { uuid } = require("uuidv4");
const db = require("./index");
const async = require("async");
const _ = require("underscore");
const { resolve } = require("path");
const { reject } = require("underscore");
const moment = require("moment");

module.exports = {
  saveToMaster(form, user, callback) {
    console.log("==>>", form);

    // return "ha";
    let insertQuery = `INSERT INTO masters(applicationId, mobileNumber, name, fathersName, gender, dob, aadhaarNo, aadharMobile, pan_number, voterID, area, district, LAC, village, gaon_panchayat, block, pincode, police_station, name_of_co_operatice_society, addree_of_co_operatice_society, registration_no_of_co_operatice_society, bank_name, bank_account_holder_name, bank_account_no, ifsc_code, milk_production_per_month, status, approverName, approverId)  VALUES ?`;
    let id = uuid();
    let params = [];
    params.push(form.applicationId);
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
    params.push("Approve");
    params.push(user.name);
    params.push(user.uid);

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

  getMaster(data, callback) {
    console.log("FROM MODAL: ", data);
    let role = data.user.role;
    let district = data.user.district;
    let offset = data.offset;
    let limit = data.limit;
    let filterBy = data.filterBy;
    let filterData = data.filterData;

    let query = "";
    switch (role) {
      case "Super Admin":
        if (filterBy) {
          query = `SELECT * FROM masters WHERE ${filterBy} = '${filterData}'  ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("1=>", query);
        } else {
          query = `SELECT * FROM masters ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("2=>", query);
        }

        break;

      case "Admin":
        if (filterBy) {
          query = `SELECT * FROM masters WHERE ${filterBy} = '${filterData}' AND district= '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("3=>", query);
        } else {
          query = `SELECT * FROM masters WHERE district = '${district}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}  `;
          console.log("4=>", query);
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

  async postMonthlyReport(data, month, amountPerLitter, approveBy, callback) {
    const query = `INSERT INTO monthly_reports (applicationId, month, litter, amount, quality, isApprove, approveBy, paymentStatus) VALUES ?`;
    const batchSize = 100;
    let insertedLength = 0;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data
        .slice(i, i + batchSize)
        .map((e) => [
          e.applicationId,
          month,
          e.litter,
          e.litter * amountPerLitter,
          e.quality,
          "Approve",
          approveBy,
          "Pending",
        ]);

      try {
        await db.query(query, [batch]);
        insertedLength += batch.length;
        console.log(`Batch ${Math.ceil((i + 1) / batchSize)} inserted.`);
      } catch (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
        return;
      }
    }

    callback &&
      callback({ message: `Inserted ${insertedLength} items successfully` });
  },

  async updateMonthlyReport(data, month, amountPerLitter, approveBy, callback) {
    console.log("approveBy", approveBy);

    const query = `UPDATE monthly_reports SET litter = ?, amount = ?, isApprove = ?, paymentStatus = ? , approveBy= ? WHERE applicationId = ? AND month = ?`;
    const batchSize = 100;
    let insertedLength = 0;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      try {
        for (const e of batch) {
          const params = [
            e.litter,
            e.litter * amountPerLitter,
            "Approve",
            "Pending",
            approveBy,
            e.applicationId,
            e.month,
          ];

          await db.query(query, params);
          insertedLength++;
        }

        console.log(
          `Batch ${Math.ceil(
            (i + 1) / batchSize
          )} Updated. Values=> ${JSON.stringify(batch)}`
        );
      } catch (err) {
        console.log("Error: ", err);
        if (callback) {
          callback({ message: "Error occurred", error: err });
        }
        return;
      }
    }

    if (callback) {
      callback({ message: `Updated ${insertedLength} items successfully` });
    }
  },

  async getMasterWithReport(month, district, user, callback) {
    console.log("month", month);
    // console.log("district==>>", district);
    console.log("user==>>", user);

    let query = `
      SELECT 
        farmers.*,

        monthly_reports.litter,
        monthly_reports.isApprove,
        monthly_reports.paymentStatus,
        monthly_reports.amount,
        monthly_reports.quality,
        monthly_reports.month,
        monthly_reports.approveBy,
        dcs.name AS dcs_name,
        dcs.registration_no AS dcs_registration_no,
        dcs.address AS dcs_address,
        dcs.status AS dcs_status
      FROM 
        farmers
      LEFT JOIN 
        monthly_reports 
      ON 
        farmers.applicationId = monthly_reports.applicationId
      AND 
        monthly_reports.month = ?
      LEFT JOIN 
        dcs 
      ON 
        farmers.dcsID = dcs.uid
    `;

    // Add the district filter if provided
    const params = [month];
    if (user.role === "DCS") {
      query += " WHERE dcs.uid = ?";
      params.push(user.uid);
    }

    if (user.role === "DLC") {
      query +=
        ` WHERE (monthly_reports.approveBy = 1 OR monthly_reports.approveBy = 2) AND dcs.dlc_id = ${user.uid}`;
    }
    if (user.role === "SLSC") {
      query +=
        " WHERE monthly_reports.approveBy = 2 OR monthly_reports.approveBy = 3 ";
    }

    // else{
    //   query += " WHERE monthly_reports.approveBy = 1";
    // }

    console.log("query", query);
    console.log("user.role ", user.role);

    db.query(query, params, (err, result) => {
      if (err) {
        console.log("Error: ", err);
        if (callback) {
          callback({ message: "Error occurred", error: err });
        }
      } else {
        if (callback) {
          callback({ message: "success", data: result });
        }
      }
    });
  },

  getMonthlyReport(month, callback) {
    console.log("month", month);
    let query = "";
    if (month) {
      query = `SELECT 
                masters.name, 
                masters.name_of_co_operatice_society, 
                masters.registration_no_of_co_operatice_society, 
                masters.bank_name, 
                masters.bank_account_holder_name, 
                masters.bank_account_no, 
                masters.ifsc_code, 
                masters.district,
                monthly_reports.month, 
                monthly_reports.litter, 
                monthly_reports.amount, 
                monthly_reports.isApprove, 
                monthly_reports.paymentStatus,
                monthly_reports.id

            FROM 
                masters
            JOIN 
                monthly_reports 
            ON 
                masters.applicationId = monthly_reports.applicationId
            WHERE 
                monthly_reports.month = ?;
            `;
    } else {
      query = `SELECT 
                masters.name, masters.name_of_co_operatice_society, masters.registration_no_of_co_operatice_society, masters.bank_name, masters.bank_account_holder_name, masters.bank_account_no, masters.ifsc_code, masters.district,
                monthly_reports.month, monthly_reports.litter, monthly_reports.amount, monthly_reports.isApprove, monthly_reports.paymentStatus, monthly_reports.id
              FROM 
                masters
                JOIN 
                monthly_reports 
              ON 
                masters.applicationId = monthly_reports.applicationId; `;
    }

    db.query(query, [month], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        // console.log("result ==>>", result);
        callback && callback({ message: "success", data: result });
      }
    });
  },

  // reports
  getRangeSubsidy(from, to, id, role, callback) {
    let query = "";
    let approveBy = "";
    if (role === "DCS") {
      approveBy = 1;
    }
    if (role === "DLC") {
      approveBy = 2;
    }
    if (role === "SLSC") {
      approveBy = 3;
    }
    if (role === "Finance") {
      approveBy = 3;
    }
    if (role === "Super Admin") {
      approveBy = 3;
    }


    const params = [from, to];
    if (id) {
      console.log("id filter used: ", id);
      query = `
        SELECT 
            mr.applicationId,
            mr.paymentStatus,
            mr.approveBy,
            u.name,
            u.district,
            u.bank_name,
            u.bank_account_holder_name,
            u.bank_account_no,
            u.ifsc_code,
            dcs.name AS dcs_name,
            dcs.registration_no AS dcs_registration_no,
            dcs.address AS dcs_address,
            dcs.status AS dcs_status,
            GROUP_CONCAT(CONCAT(DATE_FORMAT(STR_TO_DATE(mr.month, '%Y-%m'), '%M %Y'), ' (', mr.litter, ')') ORDER BY mr.month ASC SEPARATOR '/ ') AS subsidy_details,
            GROUP_CONCAT(CONCAT(mr.amount) ORDER BY mr.month ASC SEPARATOR ', ') AS amounts,
            SUM(mr.amount) AS total_amount,
            SUM(mr.litter) AS quantity
        FROM 
            monthly_reports mr
        JOIN 
            farmers u ON mr.applicationId = u.applicationId
        LEFT JOIN 
            dcs ON u.dcsID = dcs.uid
        WHERE 
            mr.month BETWEEN ? AND ? 
            AND mr.paymentStatus = 'Pending'
            AND mr.isApprove = 'Approve'
            AND u.dcsID = ?
        GROUP BY 
            mr.applicationId, u.name`;

      params.push(id);
    } else {
      console.log("no filter used");
      query = `
        SELECT 
            mr.applicationId,
            mr.paymentStatus,
            mr.approveBy,
            u.name,
            u.district,
            u.bank_name,
            u.bank_account_holder_name,
            u.bank_account_no,
            u.ifsc_code,
            dcs.name AS dcs_name,
            dcs.registration_no AS dcs_registration_no,
            dcs.address AS dcs_address,
            dcs.status AS dcs_status,
            GROUP_CONCAT(CONCAT(DATE_FORMAT(STR_TO_DATE(mr.month, '%Y-%m'), '%M %Y'), ' (', mr.litter, ')') ORDER BY mr.month ASC SEPARATOR '/ ') AS subsidy_details,
            GROUP_CONCAT(CONCAT(mr.amount) ORDER BY mr.month ASC SEPARATOR ', ') AS amounts,
            SUM(mr.amount) AS total_amount,
            SUM(mr.litter) AS quantity
        FROM 
            monthly_reports mr
        JOIN 
            farmers u ON mr.applicationId = u.applicationId
        LEFT JOIN 
            dcs ON u.dcsID = dcs.uid
        WHERE 
            mr.month BETWEEN ? AND ? 
            AND mr.paymentStatus = 'Pending'
            AND mr.isApprove = 'Approve'
            AND mr.approveBy = ${approveBy}
        GROUP BY 
            mr.applicationId, u.name`;
    }

    console.log("id ", id);
    console.log("role ", role);
    db.query(query, params, (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback && callback({ message: "Error occurred", error: err });
      } else {
        // console.log("result ==>>", result);
        callback && callback({ message: "success", data: result });
      }
    });
  },

  individualMonthlyReport(formData, callback) {
    // Parameterized query to prevent SQL injection
    const checkQuery = `SELECT * FROM monthly_reports WHERE applicationId = ? AND month = ?`;

    // Check if data already exists
    db.query(
      checkQuery,
      [formData.applicationId, formData.month],
      (err, results) => {
        if (err) {
          console.error("Error: ", err);
          callback &&
            callback({
              status: 500,
              message: "Failed to check existing data",
              error: err,
            });
          return;
        }

        // Check if any records were found
        if (results.length > 0) {
          callback &&
            callback({ status: 400, message: "Already updated data" });
          return;
        }

        // Define the insert query with placeholders
        const insertQuery = `INSERT INTO monthly_reports (applicationId, month, litter, amount, isApprove, paymentStatus) VALUES (?, ?, ?, ?, ?, ?)`;

        const params = [
          formData.applicationId,
          formData.month,
          formData.litter,
          formData.litter * 5, // Calculate the amount based on litter
          formData.isApprove,
          formData.paymentStatus,
        ];

        // Insert the new record
        db.query(insertQuery, params, (err, result) => {
          if (err) {
            console.error("Error: ", err);
            callback &&
              callback({
                status: 500,
                message: "Failed to insert data",
                error: err,
              });
            return;
          }

          // Provide success message
          callback && callback({ status: 200, message: "Success" });
        });
      }
    );
  },

  getIndividualMonthlyReport(id, callback) {
    console.log("id ", id);
    const query = `SELECT 
              masters.name, masters.name_of_co_operatice_society, masters.registration_no_of_co_operatice_society, masters.bank_name, masters.bank_account_holder_name, masters.bank_account_no, masters.ifsc_code, masters.district,
              monthly_reports.month, monthly_reports.litter, monthly_reports.amount, monthly_reports.isApprove, monthly_reports.paymentStatus, monthly_reports.id
            FROM 
              masters
              JOIN 
              monthly_reports 
            ON 
              masters.applicationId = monthly_reports.applicationId
            WHERE monthly_reports.applicationId = ? 
            ORDER BY month`;

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        console.log("Query results:", results);
        callback(results);
      }
    });
  },

  saveGrievance(data, callback) {
    console.log(data);

    // The VALUES clause should not have extra brackets when inserting a single row
    let query = `INSERT INTO grievance(userId, userName, type, details) VALUES (?, ?, ?, ?)`;

    db.query(
      query,
      [
        data.user.applicationId,
        data.user.name,
        data.grievanceType,
        data.details,
      ],
      (error, results) => {
        if (error) {
          console.error("Database query error:", error);
          callback(error, null);
        } else {
          console.log("Query results:", results);
          callback({ message: "Success" });
        }
      }
    );
  },

  getGrievance(callback) {
    let query = `SELECT * FROM grievance`;

    db.query(query, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        console.log("Query results:", results);
        callback({ data: results });
      }
    });
  },
};
