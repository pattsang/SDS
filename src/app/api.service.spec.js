"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var api_service_1 = require("./api.service");
describe('ApiService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(api_service_1.ApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api.service.spec.js.map