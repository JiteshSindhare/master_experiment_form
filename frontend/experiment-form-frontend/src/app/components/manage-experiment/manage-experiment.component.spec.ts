import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExperimentComponent } from './manage-experiment.component';

describe('ManageExperimentComponent', () => {
  let component: ManageExperimentComponent;
  let fixture: ComponentFixture<ManageExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
