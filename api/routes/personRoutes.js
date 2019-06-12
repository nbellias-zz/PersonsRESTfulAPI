'use strict';
module.exports = function(app) {
  var personList = require('../controllers/personController');

  // personList Routes
  app.route('/persons')
    .get(personList.list_all_persons)
    .get(personList.list_all_persons_by_page)
    .post(personList.create_a_person);
  
  app.route('/personsbypage/:limit/:page')
    .post(personList.list_all_persons_by_page);

  app.route('/persons/:personId')
    .get(personList.read_a_person)
    .put(personList.update_a_person)
    .delete(personList.delete_a_person);
};