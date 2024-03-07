import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private querySubject = new BehaviorSubject<string>('');

  get query$() {
    return this.querySubject.asObservable();
  }

  setQuery(query: string) {
    this.querySubject.next(query);
  }
}
