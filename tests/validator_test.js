"use strict";

const assert = require("assert");
const validator = require("../utils/validator");
const equality = require('../utils/index');

describe("Validator", () => {
    // before(() => {
    //     console.log("before executes once before all tests");
    // });

    // after(() => {
    //     console.log("after executes once after all tests");
    // });

    describe("check_str_input", () => {
        // beforeEach(() => {
        //     console.log("beforeEach executes before every test");
        // });

        it("should return true after validating given name with type str", () => {
            let check_result = equality.deepEqual(validator.validate_all_fields({"name": "str"}, {"name": "customer_name"}), {})
            assert.equal(true, check_result);
        });
        it("should return true after validating given email_id with type email", () => {
            let check_result = equality.deepEqual(validator.validate_all_fields({"email_address": "email"}, {"email_address": "sss@gmail.com"}), {})
            assert.equal(true, check_result);
        });

        // it("should return 0 when adding zeros", () => {
        //     assert.equal(calc.add(0, 0), 0);
        // });
    });

    // describe("error", () => {
    //     it("should return an error", () => {
    //         assert.throws(calc.badd, {
    //             name: "Error",
    //             message: "it blowed up"
    //         });
    //     });
    // });
});