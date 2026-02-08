import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBySidePreviewComponent } from './side-by-side-preview.component';

describe('SideBySidePreviewComponent', () => {
  let component: SideBySidePreviewComponent;
  let fixture: ComponentFixture<SideBySidePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideBySidePreviewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SideBySidePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
