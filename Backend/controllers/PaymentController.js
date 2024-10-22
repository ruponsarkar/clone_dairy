
const request = require("request");
const { application } = require("express");
const axios = require('axios');
const crypto = require('crypto');
const async = require('async');
const BeneficiaryModel = require("../models/BeneficiaryModel");

module.exports = {
  async view(req, res){
    let requestData = {
    };
    BeneficiaryModel.view(requestData, (result) => {
      res.status(200).send(result);
    });
  },
  async createBeneficiary(req, res) {
    let beneficiaryData = req.body.data.beneficiaryData;
    let additionalData = req.body.data.additionalData;
    try {
      async.waterfall([
        (fn) => {
          const options = {
            method: 'POST',
            url: process.env.CASHFREE_ADD_BENEFICIARY_URL,
            headers: {
              accept: 'application/json',
              'x-api-version': '2024-01-01',
              'x-request-id': additionalData.api_request_id,
              'content-type': 'application/json',
              'x-client-id': process.env.CASHFREE_APP_ID,
              'x-client-secret': process.env.CASHFREE_SECRET_KEY
            },
            data: beneficiaryData
          };
          axios
            .request(options)
            .then(function (response) {
              return fn(null, response.data);
            })
            .catch(function (error) {
              console.error(error);
              return fn(null, error);
            });
        },
        (responseData, fn) => {
          let requestData = {
            farmer_id: additionalData.farmer_id,
            beneficiary_id: beneficiaryData.beneficiary_id,
            api_request_id: additionalData.api_request_id,
            status: 'Active'
          };
          BeneficiaryModel.create(requestData, (result) => {
            // res.status(200).send(result);
            return fn(null, responseData);
          });
        }
      ], (error, result) => {
        if (error) {
          console.error('Error creating beneficiary:', error);
          res.status(500).send('Error creating beneficiary');
        }
        res.status(200).send(result);
      });
    } catch (error) {
      console.error('Error creating beneficiary:', error);
      res.status(500).send('Error creating beneficiary');
    }
  },
};

function generateChecksum(data, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);
  return hmac.digest('hex');
}
