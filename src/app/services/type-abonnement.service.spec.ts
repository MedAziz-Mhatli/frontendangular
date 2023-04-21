import { TestBed } from '@angular/core/testing';

import { TypeAbonnementService } from './type-abonnement.service';

describe('TypeAbonnementService', () => {
  let service: TypeAbonnementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAbonnementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
