import { TestBed } from '@angular/core/testing';

import { SectionNiveauService } from './section-niveau.service';

describe('SectionNiveauService', () => {
  let service: SectionNiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionNiveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
