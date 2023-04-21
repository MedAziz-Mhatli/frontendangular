import { TestBed } from '@angular/core/testing';

import { MatiereOptionService } from './matiere-option.service';

describe('MatiereOptionService', () => {
  let service: MatiereOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
