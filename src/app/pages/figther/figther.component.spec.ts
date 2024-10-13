import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigtherComponent } from './figther.component';

describe('FigtherComponent', () => {
  let component: FigtherComponent;
  let fixture: ComponentFixture<FigtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FigtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FigtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
