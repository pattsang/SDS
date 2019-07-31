/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SdsRequestService } from './sdsRequest.service';

describe('Service: SdsRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SdsRequestService]
    });
  });

  it('should ...', inject([SdsRequestService], (service: SdsRequestService) => {
    expect(service).toBeTruthy();
  }));
});
