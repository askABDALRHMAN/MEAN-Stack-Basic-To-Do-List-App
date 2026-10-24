import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Todo {
  text: string;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/todos`;

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(text: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { text });
  }
}
