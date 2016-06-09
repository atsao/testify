/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.todo-list', 'List should exist');
    test.assertExists('.todo-form', 'Form should exist');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin('Adds an item', 1, function suite(test) {
  // var testLength = this.items.length;
  
  casper.start('http://localhost:3000/', function() {
    // test.assert(this.items.length);
    this.fill('input', { todo: 'Test todo'}, true);
    // test.assertExists()
  });

  casper.then(function() {
    test.assertExists('input[data-todo-id=8]');
  });

  casper.run(function() {
    test.done();
  })
});