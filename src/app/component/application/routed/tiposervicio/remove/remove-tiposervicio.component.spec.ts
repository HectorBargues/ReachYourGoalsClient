import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTiposervicioComponent } from './remove-tiposervicio.component';

describe('RemoveTiposervicioComponent', () => {
  let component: RemoveTiposervicioComponent;
  let fixture: ComponentFixture<RemoveTiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTiposervicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
