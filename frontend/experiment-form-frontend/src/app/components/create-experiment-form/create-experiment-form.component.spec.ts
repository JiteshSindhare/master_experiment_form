import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExperimentFormComponent } from './create-experiment-form.component';

describe('CreateExperimentFormComponent', () => {
  let component: CreateExperimentFormComponent;
  let fixture: ComponentFixture<CreateExperimentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExperimentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExperimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
