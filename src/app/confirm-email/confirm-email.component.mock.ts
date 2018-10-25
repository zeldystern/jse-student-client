import { convertToParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class ActivatedRouteMock {
    public paramMap = Observable.of(convertToParamMap({ 
        student_id: 'abc123',
        token: 'd31e8b48-7309-4c83-9884-4142efdf7271',          
    }));
}


