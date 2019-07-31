"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var label_service_1 = require("./label.service");
describe('Service: Label', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [label_service_1.LabelService]
        });
    });
    it('should ...', testing_1.inject([label_service_1.LabelService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=label.service.spec.js.map