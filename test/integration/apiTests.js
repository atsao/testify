var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('API integration', function(){
  var server, setupStub, JSONresponse;

  beforeEach(function() {
    setupStub = sinon.stub(todo, 'setup');
    
    server = sinon.fakeServer.create();
    
    JSONresponse = JSON.stringify({
      name: 'Test',
      done: true,
      todos: []
    });

    server.respondWith('GET', 'http://localhost:3000/todos', [200, {'Content-Type': 'application/json'}, JSONresponse]);
    server.respondImmediately = true;
  });

  afterEach(function() {
    setupStub.restore();
    server.restore();
  })

  it('todo.setup receives an array of todos when todo.init is called', function () {
    todo.init(false);
    
    // server.respond();
    
    sinon.assert.calledWith(setupStub, sinon.match.array);
  });

  it('todo.api receives a JSON object on successful GET request', function() {
    var response = '';
    todo.api.sendRequest({
      method: 'GET',
      endpoint: 'http://localhost:3000/todos'
    }, function(err, res) {
      if (err) { throw err; }

      response = res;
    });

    assert.typeOf(response, 'object');
  });

  xit('todo.api sends an error on a bad request', function() {
    server.respondWith('GET', 'http://localhost:3000/todos', [404, {}, '']);

    var error = '';
    todo.api.sendRequest({
      method: 'GET',
      endpoint: 'http://localhost:3000/todos'
    }, function(err, res) {
      console.log('res:', res);
      console.log('err:', err);

      if (err) {
        error = err;
      }

      error = res;
    });
    expect(error).to.be.ok;

  });
});
