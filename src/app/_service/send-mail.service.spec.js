"use strict";
/* tslint:disable:no-unused-variable */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var send_mail_service_1 = require("./send-mail.service");
describe('Service: SendMail', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [send_mail_service_1.SendMailService]
        });
    });
    it('should ...', testing_1.inject([send_mail_service_1.SendMailService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=send-mail.service.spec.js.map