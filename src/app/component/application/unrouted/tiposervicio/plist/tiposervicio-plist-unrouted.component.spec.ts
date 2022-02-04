import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposervicioplistunroutedComponent } from './tiposervicioplistunrouted.component';

describe('TiposervicioplistunroutedComponent', () => {
  let component: TiposervicioplistunroutedComponent;
  let fixture: ComponentFixture<TiposervicioplistunroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposervicioplistunroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposervicioplistunroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
