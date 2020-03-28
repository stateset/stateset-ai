import axios from 'axios';
import querystring from 'querystring';
import React, { useEffect, useState, useContext } from 'react';
import OrganizationContext from '../../components/OrganizationContext';
const { Parser } = require('json2csv');
const fs = require("fs");
const ObjectsToCsv = require('objects-to-csv');
const Blob = require('blob');

export default (props) => {
  
    let axiosConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json"
        }
      };
  
    axios.get("https://stateset.network:8080/api/stateset/getAccounts", axiosConfig)
      .then(res => {
  
        console.log(res.data);
        const accountFields = ["accountId", "accountName", "accountType", "industry", "phone", "yearStarted", "annualRevenue", "businessAddress", "businessCity", "businessState", "businessZipCode", "controller", "processor" ];
  
        // convert json to csv
        const json2csvParser = new Parser({ fields: accountFields });
        const csv = json2csvParser.parse(res.data);
  
        // console log 
        console.log(csv);
        
        // save updated csv and write to file dir
        const accountFile = new ObjectsToCsv(res.data);

        accountFile.toDisk('../stateset-ai/data/accounts/account.csv', { append: true })
        }
    )
};