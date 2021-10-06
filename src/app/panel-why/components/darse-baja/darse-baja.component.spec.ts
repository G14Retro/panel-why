import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarseBajaComponent } from './darse-baja.component';

describe('DarseBajaComponent', () => {
  let component: DarseBajaComponent;
  let fixture: ComponentFixture<DarseBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarseBajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarseBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
