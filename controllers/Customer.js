const Customer = require('../models/Customer');
const Contacts = require('../models/contactCustomer')
// const jwt = require('jwt-simple');
// const moment = require('moment');
// const config = require('../config');
// const crypto = require('crypto');

exports.postCust = (req, res) => {
    let {
     name,
    email,
      address,
      phone,
      createdDate,
      city,
      price,
      baths,
      bedrooms,
      share,
      live_tour,
      zip,
      state
      
    } = req.body;
  
    var cust = new Customer({
        name,
      
        email,
        address,
        phone,
        createdDate,
        city,
        price,
        baths,
        bedrooms,
        share,
        live_tour,
        zip,
        state
    });
    cust.save().then((cust) => {
      console.log('Added successfully');
      res.json(cust);
    })
  };
  exports.custSignUp = (req, res, next) => {
    var cust = new Customer({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      price:req.body.price,
      baths: req.body.baths,

      bedrooms:req.body.bedrooms,
      share:req.body.share,
      live_tour: req.body.live_tour,
      zip: req.body.zip,
      state: req.body.state,
    });
    cust.save(function(err) {
      console.log(cust)
      console.log(err)

      if (err) return next({
        message: "customer registeration failed",
        error: err
      });
      res.json({
        message: "cust registered successfully",
        status: 200
      });
    });
  };

  exports.getAllCustomers = (req, res) => {
    Customer.find({}, (error, customers) => {
      if (error) {
        res.json({
          message: "Server error, Please try after some time.",
          status: 500
        });
      }
      if (customers) {
        res.json({
          data: customers,
          message: "All customers fetched",
          status: 200
        });
      } else {
        res.json({
          message: "No data found",
          status: 200
        });
      }
    });
  };

  exports.feedbackAdded = (req, res, next) => {
    var cont = new Contacts({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      messagee: req.body.messagee
    });
    cont.save(function(err) {
      console.log(cont)
      console.log(err)

      if (err) return next({
        message: "feedback added failed",
        error: err
      });
      res.json({
        message: "feedback added successfully",
        status: 200
      });
    });
  };

  exports.getAllCustomersFeedbacks = (req, res) => {
    Contacts.find({}, (error, cont) => {
      if (error) {
        res.json({
          message: "Server error, Please try after some time.",
          status: 500
        });
      }
      if (cont) {
        res.json({
          data: cont,
          message: "All feedbacks fetched",
          status: 200
        });
      } else {
        res.json({
          message: "No data found",
          status: 200
        });
      }
    });
  };