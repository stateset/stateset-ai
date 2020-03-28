import axios from 'axios';
import querystring from 'querystring';
import React, { useEffect, useState, useContext } from 'react';
import OrganizationContext from '../../components/OrganizationContext';
const { Parser } = require('json2csv');
const fs = require("fs");
const ObjectsToCsv = require('objects-to-csv');

export default (props) => {
  
    let axiosConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json"
        }
      };
  
    axios.get("https://stateset.network:8080/api/princeton/getInvoices", axiosConfig)
      .then(res => {
  
        console.log(res.data);
        const invoiceFields = [ "invoiceNumber",
        "invoiceName",
        "billingReason",
        "amountDue",
        "amountPaid",
        "amountRemaining",
        "subtotal",
        "total",
        "party",
        "counterparty",
        "dueDate",
        "periodStartDate",
        "periodEndDate",
        "paid",
        "active",
        "createdAt",
        "lastUpdated",
        "linearId" ];
  
        // convert json to csv
        const json2csvParser = new Parser({ fields: invoiceFields });
        const csv = json2csvParser.parse(res.data);
  
        // console log 
        console.log(csv);
        
        // save updated csv and write to file dir
        const invoiceFile = new ObjectsToCsv(res.data);

        invoiceFile.toDisk('../stateset-ai/data/invoices/invoices.csv', { append: true })
        }
    )
};