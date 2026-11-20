import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  email = '';
  senha = '';
  erro = signal('');

  entrar() {
    this.erro.set('');
    this.clienteService.login(this.email, this.senha).subscribe({
      next: cliente => {
        if (cliente.codigo > 0) {
          cliente.senha = '';
          Cliente.logado = cliente;
          this.router.navigate(['/vitrine']);
        } else {
          this.erro.set('E-mail ou senha inválidos.');
        }
      },
      error: () => this.erro.set('Não foi possível falar com o servidor. O backend está ligado?')
    });
  }
}