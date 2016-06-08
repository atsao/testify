var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the todo.App', function() {
  before(function() {
    todo.init(true);
  });

  describe('the todo object', function(){

    it('should have all the necessary methods', function(){
      expect(todo).to.have.property('setup');
      assert.property(todo, 'init');
    });
  });
});

describe('the todo.util methods', function() {
  
  describe('trimTodoName', function() {

    it('should exist', function() {
      todo.util.should.have.property('trimTodoName');
    });

    it('should be a function', function() {
      assert.typeOf(todo.util.trimTodoName, 'function');
    });

    it('should trim trailing spaces', function() {
      var name = 'clean sheets   ';
      expect(todo.util.trimTodoName(name)).to.equal('clean sheets');
    });

    it('should trim leading spaces', function() {
      var name = '   clean sheets';
      expect(todo.util.trimTodoName(name)).to.equal('clean sheets');
    });
    
    it('should trim leading and trailing spaces', function() {
      var name = '   clean sheets    ';
      expect(todo.util.trimTodoName(name)).to.equal('clean sheets');
    });

    it('should reduce length of todo name with extra spaces', function() {
      var name = 'clean sheets   ';
      expect(todo.util.trimTodoName(name)).to.have.length.below(13);
    });

  });

  describe('isValidTodoName', function() {

    it('should exist', function() {
      todo.util.should.have.property('isValidTodoName');
    });

    it('should be a function', function() {
      assert.typeOf(todo.util.isValidTodoName, 'function');
    });

    it('should invalidate todo names without at least 2 non-space characters', function() {
      var name = ' ';
      expect(todo.util.isValidTodoName(name)).to.not.equal(true);
    });

    it('should validate todo names with at least 2 non-space characters', function() {
      var name = 'clean sheets';
      expect(todo.util.isValidTodoName(name)).to.not.equal(false);
    });

  });

  describe('getUniqueId', function() {

    it('should exist', function() {
      todo.util.should.have.property('getUniqueId');
    });

    it('should be a function', function() {
      assert.typeOf(todo.util.getUniqueId, 'function');
    });

    it('should return a number', function() {
      assert.typeOf(todo.util.getUniqueId(), 'number');
    });

    it('should return a number 1 higher than previous call', function() {
      var first = todo.util.getUniqueId();
      var second = todo.util.getUniqueId();

      expect(second).to.be.equal(first + 1);
    });

  });
});
