import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
}).catch((error: unknown) => {
  console.error('Failed to start the To-Do List application:', error);
});
