import { Directive, forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/observable/of'; 
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { StudentService } from '../services/student.service';

@Injectable({ providedIn: 'root' })
export class UniqueUserNameValidator implements AsyncValidator {
  constructor(private studentService: StudentService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.studentService.isUserNameTaken(ctrl.value).pipe(
      map(isTaken => ((isTaken == true) ? { userNameIsNotUnique: true } : null)),
      catchError(() => null)
    );
  }
}

@Directive({
  selector: '[appUniqueUserName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUserNameValidator),
      multi: true
    }
  ]
})

export class UniqueUserNameValidatorDirective {
  constructor(private validator: UniqueUserNameValidator) {}
  
  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}