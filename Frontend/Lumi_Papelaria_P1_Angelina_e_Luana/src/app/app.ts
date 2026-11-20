import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lumi Papelaria');

  private router = inject(Router);

  buscar(termo: string) {
    this.router.navigate(['/resultado-busca'], { queryParams: { q: termo.trim() } });
  }
}
