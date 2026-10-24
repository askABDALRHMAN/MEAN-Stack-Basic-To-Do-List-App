import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="todo-app">
      <h1>To-Do List</h1>

      <form (ngSubmit)="addTodo()">
        <label for="todo-text">New to-do</label>
        <div class="input-row">
          <input
            id="todo-text"
            name="todoText"
            [(ngModel)]="newTodoText"
            [disabled]="isSaving"
            autocomplete="off"
            required
          >
          <button type="submit" [disabled]="isSaving || !newTodoText.trim()">Add</button>
        </div>
      </form>

      <p class="message" role="status" [hidden]="!isLoading">Loading to-dos...</p>
      <p class="message error" role="alert" [hidden]="!errorMessage">{{ errorMessage }}</p>

      <ul [hidden]="isLoading || todos.length === 0">
        @for (todo of todos; track $index) {
          <li>{{ todo.text }}</li>
        }
      </ul>
      <p class="message" [hidden]="isLoading || todos.length > 0">No to-dos yet.</p>
    </main>
  `,
  styles: [`
    .todo-app {
      width: min(100% - 2rem, 34rem);
      margin: 4rem auto;
      padding: 1.5rem;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      box-shadow: 0 8px 24px rgb(15 23 42 / 8%);
    }

    h1 {
      margin-top: 0;
      font-size: 1.75rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .input-row {
      display: flex;
      gap: 0.5rem;
    }

    input {
      flex: 1;
      min-width: 0;
      padding: 0.65rem 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.375rem;
      font: inherit;
    }

    button {
      padding: 0.65rem 1rem;
      color: #fff;
      background: #2563eb;
      border: 0;
      border-radius: 0.375rem;
      font: inherit;
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    ul {
      padding-left: 1.25rem;
    }

    li {
      padding: 0.4rem 0;
      overflow-wrap: anywhere;
    }

    .message {
      color: #475569;
    }

    .error {
      color: #b91c1c;
    }
  `]
})
export class AppComponent implements OnInit {
  private readonly todoService = inject(TodoService);

  todos: Todo[] = [];
  newTodoText = '';
  isLoading = true;
  isSaving = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo(): void {
    const text = this.newTodoText.trim();
    if (!text || this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.todoService.addTodo(text).subscribe({
      next: () => {
        this.newTodoText = '';
        this.isSaving = false;
        this.loadTodos();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error);
        this.isSaving = false;
      }
    });
  }

  private loadTodos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error?.error === 'string') {
      return error.error.error;
    }
    return 'Unable to communicate with the server. Please try again.';
  }
}
