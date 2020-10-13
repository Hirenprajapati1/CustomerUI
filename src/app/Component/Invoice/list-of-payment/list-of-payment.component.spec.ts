import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPaymentComponent } from './list-of-payment.component';

describe('ListOfPaymentComponent', () => {
  let component: ListOfPaymentComponent;
  let fixture: ComponentFixture<ListOfPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
