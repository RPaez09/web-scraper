const getToken = require("../helpers/getToken");

const chai = require("chai");
const expect = chai.expect;

const noAuthHeader = {
    contentType: "application/json"
};

const mockHeader = {
    contentType: "application/json",
    authorization: "JWT SAMPLETOKEN"
}

describe("getToken", () => {
    it("Returns null when headers aren't present", () => {
        expect( getToken(null) ).to.equal(null);
    });
    it("Returns null if headers are lacking authorization", () => {
        expect( getToken(noAuthHeader) ).to.equal(null);
    });
    it("Extracts a token from a valid auth header", () => {
        expect( getToken(mockHeader) ).to.equal("SAMPLETOKEN");
    });
});