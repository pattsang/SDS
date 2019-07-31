"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var location_service_1 = require("./location.service");
describe('Service: Location', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [location_service_1.LocationService]
        });
    });
    it('should ...', testing_1.inject([location_service_1.LocationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=location.service.spec.js.map