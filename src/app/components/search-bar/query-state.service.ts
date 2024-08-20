import { Injectable, signal, WritableSignal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class QueryStateService {

  private querySignal: WritableSignal<string> = signal('');

  getQuery() {
    return this.querySignal;
  }

  setQuery(query: string) {
    this.querySignal.set(query);
  }
}
