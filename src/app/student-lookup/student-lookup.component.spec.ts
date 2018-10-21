import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

import { StudentLookupComponent } from './student-lookup.component';

describe('StudentLookupComponent', () => {
  let component: StudentLookupComponent;
  let fixture: ComponentFixture<StudentLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule, 
        FormsModule,
        SharedMaterialModule,
        HttpClientModule,
        HttpModule,
        BrowserAnimationsModule
      ],
      declarations: [  
        StudentLookupComponent    
      ],
      providers: [
        StudentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
