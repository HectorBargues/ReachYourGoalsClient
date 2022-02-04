import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistTiposervicioComponent } from './tiposervicio-plist-routed.component';

describe('PlistTiposervicioComponent', () => {
  let component: PlistTiposervicioComponent;
  let fixture: ComponentFixture<PlistTiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistTiposervicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlistTiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
