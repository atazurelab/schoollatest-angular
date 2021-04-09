import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdataComponent } from './importdata.component';

describe('ImportdataComponent', () => {
  let component: ImportdataComponent;
  let fixture: ComponentFixture<ImportdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
