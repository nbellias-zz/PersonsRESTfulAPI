'use strict';


var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate-v2'),
  Person = mongoose.model('Persons');

exports.list_all_persons = function (req, res) {
  Person.find({}, function (err, persons) {
    if (err)
      res.send(err);
    res.json(persons);
  });
};


exports.list_all_persons_by_page = function (req, res) {
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

  const options = {
    page: recordPage,
    limit: recordLimit,
    customLabels: myCustomLabels
  };
  
  Person.paginate({}, options, function (err, persons) {
    if (err)
      res.send(err);
    res.json(persons);
  });
};

exports.create_a_person = function (req, res) {
  var new_person = new Person(req.body);
  new_person.save(function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};


exports.read_a_person = function (req, res) {
  Person.findById(req.params.personId, function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};


exports.update_a_person = function (req, res) {
  Person.findOneAndUpdate({ _id: req.params.personId }, req.body, { new: true }, function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};


exports.delete_a_person = function (req, res) {
  Person.deleteOne({
    _id: req.params.personId
  }, function (err, person) {
    if (err)
      res.send(err);
    res.json({ message: 'Person successfully deleted' });
  });
};