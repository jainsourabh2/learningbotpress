const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'botpress_demo'
});

// connect to database
mc.connect();



// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Retrieve todo with id
app.get('/accounttype/interestrates/:account', function (req, res) {

    let accountType = req.params.account;

    if (!accountType) {
        return res.status(400).send({ error: true, message: 'Please provide accountType' });
    }

    mc.query('SELECT interestrates FROM accounttype_interestrates where accounttype=?', accountType, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Result.' });
    });

});

app.get('/branch/branchdetails/:city', function (req, res) {

    let city = req.params.city;

    if (!city) {
        return res.status(400).send({ error: true, message: 'Please provide city information' });
    }

    mc.query('SELECT branch FROM branches where city=?', city, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Result.' });
    });

});

app.get('/fixeddeposits/fixeddepositdetails/:category', function (req, res) {

  let category = req.params.category;

  if (!category) {
      return res.status(400).send({ error: true, message: 'Please provide Category' });
  }

  mc.query('SELECT interestrates FROM fixeddeposits where category=?', category, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Result.' });
  });

});

app.get('/account/validate/:customerid', function (req, res) {

  let customerID = req.params.customerid;

  if (!customerID) {
      return res.status(400).send({ error: true, message: 'Please provide CustoemrID' });
  }

  mc.query("SELECT CONCAT(firstname,' ',middlename,' ',lastname) AS name FROM accounts where customerid=?", customerID, function (error, results, fields) {
      if (error) throw error;
      if(results[0] === undefined)
        return res.send({ error: false, data: "Unknown", message: 'Result.' });
      else
        return res.send({ error: false, data: results[0].name, message: 'Result.' });
  });

});

app.get('/account/balance/:customerid', function (req, res) {

  let customerID = req.params.customerid;

  if (!customerID) {
      return res.status(400).send({ error: true, message: 'Please provide CustoemrID' });
  }

  mc.query("SELECT balance FROM accounts where customerid=?", customerID, function (error, results, fields) {
      if (error) throw error;
        return res.send({ error: false, data: results[0].balance, message: 'Result.' });
  });

});

app.get('/otp/generate/:customerid', function (req, res) {

  let customerID = req.params.customerid;

  if (!customerID) {
      return res.status(400).send({ error: true, message: 'Please provide CustoemrID' });
  }

  mc.query("SELECT mobilenumber FROM accounts where customerid=?", customerID, function (error, results, fields) {
      if (error) throw error;
        return res.send({ error: false, data: results[0].mobilenumber, message: 'Result.' });
  });

});

app.get('/otp/validate/:customerid', function (req, res) {

  let customerID = req.params.customerid;

  if (!customerID) {
      return res.status(400).send({ error: true, message: 'Please provide CustoemrID' });
  }

  mc.query("SELECT otp FROM accounts where customerid=?", customerID, function (error, results, fields) {
      if (error) throw error;
        return res.send({ error: false, data: results[0].otp, message: 'Result.' });
  });

});

app.get('/creditcard/book/:customerid', function (req, res) {

  let customerID = req.params.customerid;

  if (!customerID) {
      return res.status(400).send({ error: true, message: 'Please provide CustoemrID' });
  }
  var d = new Date();
  d = new Date(d.getTime() - 0);
  var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
  //console.log(date_format_str);
  //2015-03-31 13:35:00
  let transactionId = Math.round((new Date()).getTime() / 1000);
  let request = {transactionid: transactionId,customerid: customerID,requestdate: date_format_str};

  mc.query("INSERT INTO creditcardbookingrequest SET ?", request, function (error, results, fields) {
      if (error) throw error;
        return res.send({ error: false, data: transactionId, message: 'Result.' });
  });

});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});
