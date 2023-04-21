import { TestBed } from '@angular/core/testing';

import { FichierMatiereService } from './fichier-matiere.service';

describe('FichierMatiereService', () => {
  let service: FichierMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichierMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
