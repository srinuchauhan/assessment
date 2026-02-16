import { TestBed } from '@angular/core/testing';

import { UpdateproductService } from './updateproduct.service';

describe('UpdateproductService', () => {
  let service: UpdateproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
