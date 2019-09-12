'use strict';

var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate-v2'),
  User = mongoose.model('Users'),
  nodemailer = require('nodemailer');


function createAppKey(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.list_all_users = function (req, res) {
  User.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

exports.list_all_users_by_page = function (req, res) {
  let recordPage = req.params.page;
  let recordLimit = req.params.limit;

  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator'
  };

  //console.log(req.body);

  const options = {
    page: recordPage,
    limit: recordLimit,
    sort: req.body,
    customLabels: myCustomLabels
  };

  User.paginate({}, options, function (err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });

};

exports.create_a_user = function (req, res) {
  var new_user = new User(req.body);
  // SOS Here create App Key
  var newKey = createAppKey(10);
  new_user.appKey = newKey;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nikolaos.bellias@gmail.com',
      pass: 'N#k0l@os1967!'
    }
  });

  var mailOptions = {
    from: 'nikolaos.bellias@gmail.com',
    to: new_user.email,
    subject: 'Your Fortunet Mobile App Key',
    text: 'Congratulations. Your key is ' + newKey
  };
  //
  new_user.save(function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
  //
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


exports.read_a_user = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function (req, res) {
  User.deleteOne({
    _id: req.params.userId
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
