import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGroupComponent } from './budget-group.component';

describe('BudgetGroupComponent', () => {
  let component: BudgetGroupComponent;
  let fixture: ComponentFixture<BudgetGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
