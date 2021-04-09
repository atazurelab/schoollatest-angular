import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDetailsComponent } from './toolbar-details.component';

describe('ToolbarDetailsComponent', () => {
  let component: ToolbarDetailsComponent;
  let fixture: ComponentFixture<ToolbarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
