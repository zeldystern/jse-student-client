import { UniqueUserNameValidator } from './user-validation.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { StudentService } from '../services/student.service';

class MockStudentService {
  
  public url: string;
  private studentSource = new BehaviorSubject(null);
  student = this.studentSource.asObservable();
  
  public isUserNameTaken(userName: string) {
    return true;
  }
}

let mockService = new MockStudentService();

describe('UserValidationDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provider: StudentService, useValue: mockService}
      ]
    })
    .compileComponents();
  }));
  it('should create an instance', () => {
    const directive = new UniqueUserNameValidator(mockService);
    expect(directive).toBeTruthy();
  });
});
