import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTiposervicioComponent } from './edit-tiposervicio.component';

describe('EditTiposervicioComponent', () => {
  let component: EditTiposervicioComponent;
  let fixture: ComponentFixture<EditTiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTiposervicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
