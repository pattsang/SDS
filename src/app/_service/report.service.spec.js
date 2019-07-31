"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var report_service_1 = require("./report.service");
describe('Service: Report', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [report_service_1.ReportService]
        });
    });
    it('should ...', testing_1.inject([report_service_1.ReportService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=report.service.spec.js.map