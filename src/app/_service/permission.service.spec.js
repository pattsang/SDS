"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var permission_service_1 = require("./permission.service");
describe('Service: Permission', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [permission_service_1.PermissionService]
        });
    });
    it('should ...', testing_1.inject([permission_service_1.PermissionService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=permission.service.spec.js.map