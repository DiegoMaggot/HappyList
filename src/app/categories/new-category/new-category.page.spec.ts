import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryPage } from './new-category.page';

describe('NewCategoryPage', () => {
  let component: NewCategoryPage;
  let fixture: ComponentFixture<NewCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
