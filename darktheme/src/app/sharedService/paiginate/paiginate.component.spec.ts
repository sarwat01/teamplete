import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiginateComponent } from './paiginate.component';

describe('PaiginateComponent', () => {
  let component: PaiginateComponent;
  let fixture: ComponentFixture<PaiginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiginateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
