import { TestBed } from '@angular/core/testing';

import { TypeFichierService } from './type-fichier.service';

describe('TypeFichierService', () => {
  let service: TypeFichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeFichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
