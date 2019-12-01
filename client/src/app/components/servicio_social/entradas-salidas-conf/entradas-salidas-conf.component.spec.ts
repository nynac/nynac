import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasSalidasConfComponent } from './entradas-salidas-conf.component';

describe('EntradasSalidasConfComponent', () => {
  let component: EntradasSalidasConfComponent;
  let fixture: ComponentFixture<EntradasSalidasConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradasSalidasConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasSalidasConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
