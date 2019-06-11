import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredientPage } from './new-ingredient.page';

describe('NewIngredientPage', () => {
  let component: NewIngredientPage;
  let fixture: ComponentFixture<NewIngredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIngredientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIngredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
