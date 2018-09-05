var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var request = require('request')
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;
var responseBody;

describe("GET /api/burgers", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all burgers", function(done) {
    // Add some burgers to the db to test with
    db.Burger.bulkCreate([
      { burger_name: "fish burger", devoured: false},
      { burger_name: "bison burger", devoured: false }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/burgers").end(function(err, res) {
        var responseStatus = res.status;
        responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody)
        //   .to.be.an("array")
        //   .that.has.lengthOf(2);

        // expect(responseBody[0])
        //   .to.be.an("object")
        //   .that.includes({ burger_name: "fish burger", devoured: false });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ burger_name: "bison burger", devoured: false });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });

  it("should retrieve 2 burgers", function(){
    expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);
  });

  it("should return first burger as fish burger", function(){
    expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ burger_name: "fish burger", devoured: false });
  });



});
