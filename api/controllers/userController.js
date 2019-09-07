'use strict';

var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate-v2'),
  User = mongoose.model('Users');

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
  new_user.save(function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
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
