import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoaderComponent } from './modal-loader.component';

describe('ModalLoaderComponent', () => {
  let component: ModalLoaderComponent;
  let fixture: ComponentFixture<ModalLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
