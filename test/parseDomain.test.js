const parseDomain = require("../helpers/parseDomain");

const chai = require("chai");
const expect= chai.expect;

describe("parseDomain", () => {
    it("Extracts the domain from a url", () => {
        expect(parseDomain("http://reddit.com/r/worldnews")).to.equal("reddit.com");
        expect(parseDomain("https://mochajs.org/")).to.equal("mochajs.org");
    });
});