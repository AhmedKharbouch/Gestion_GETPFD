import { TestBed } from '@angular/core/testing';

import { GestionDepotService } from './gestion-depot.service';

describe('GestionDepotService', () => {
  let service: GestionDepotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDepotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
