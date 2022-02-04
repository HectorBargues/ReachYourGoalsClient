import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTiposervicioComponent } from './view-tiposervicio.component';

describe('ViewTiposervicioComponent', () => {
  let component: ViewTiposervicioComponent;
  let fixture: ComponentFixture<ViewTiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTiposervicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
