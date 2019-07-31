"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var manufacturer_service_1 = require("./manufacturer.service");
describe('Service: Manufacturer', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [manufacturer_service_1.ManufacturerService]
        });
    });
    it('should ...', testing_1.inject([manufacturer_service_1.ManufacturerService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=manufacturer.service.spec.js.map