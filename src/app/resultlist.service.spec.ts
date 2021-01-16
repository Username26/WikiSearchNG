import { TestBed } from '@angular/core/testing';

import { ResultlistService } from './resultlist.service';

describe('ResultlistService', () => {
  let service: ResultlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
