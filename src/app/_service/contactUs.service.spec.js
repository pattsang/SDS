"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var contactUs_service_1 = require("./contactUs.service");
describe('Service: ContactUs', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [contactUs_service_1.ContactUsService]
        });
    });
    it('should ...', testing_1.inject([contactUs_service_1.ContactUsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=contactUs.service.spec.js.map