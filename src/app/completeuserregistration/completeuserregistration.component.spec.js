"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var completeuserregistration_component_1 = require("./completeuserregistration.component");
describe('CompleteuserregistrationComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [completeuserregistration_component_1.CompleteuserregistrationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(completeuserregistration_component_1.CompleteuserregistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=completeuserregistration.component.spec.js.map