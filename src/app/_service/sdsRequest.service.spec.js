"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sdsRequest_service_1 = require("./sdsRequest.service");
describe('Service: SdsRequest', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [sdsRequest_service_1.SdsRequestService]
        });
    });
    it('should ...', testing_1.inject([sdsRequest_service_1.SdsRequestService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=sdsRequest.service.spec.js.map