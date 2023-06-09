import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTextComponent } from './note-text.component';

describe('NoteTextComponent', () => {
  let component: NoteTextComponent;
  let fixture: ComponentFixture<NoteTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTextComponent]
    });
    fixture = TestBed.createComponent(NoteTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
