import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoryComponent } from './get-category.component';

describe('GetCategoryComponent', () => {
  let component: GetCategoryComponent;
  let fixture: ComponentFixture<GetCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
