import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTiposervicioComponent } from './new-tiposervicio.component';

describe('NewTiposervicioComponent', () => {
  let component: NewTiposervicioComponent;
  let fixture: ComponentFixture<NewTiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTiposervicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
