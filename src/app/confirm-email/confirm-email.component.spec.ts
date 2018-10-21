import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ActivatedRoute } from '@angular/router';

import { SharedMaterialModule } from '../shared-material/shared-material.module';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

import { ConfirmEmailComponent } from './confirm-email.component';

describe('ConfirmEmailComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { paramMap: {
        student_id: '13525',
        token: 'abcd'
      } 
    }
  } as ActivatedRoute;
  
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpModule, SharedMaterialModule ],
      declarations: [ ConfirmEmailComponent ],
      providers: [ StudentService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
