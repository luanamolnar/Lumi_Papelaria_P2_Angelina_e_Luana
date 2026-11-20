import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private clienteService = inject(ClienteService);

  cliente = new Cliente();
  mensagem = signal('');
  erro = signal('');

  cadastrar() {
    this.mensagem.set('');
    this.erro.set('');
    this.clienteService.cadastrar(this.cliente).subscribe({
      next: () => this.mensagem.set('Cadastro feito com sucesso! Agora é só fazer o login.'),
      error: () => this.erro.set('Não foi possível cadastrar. O backend está ligado?')
    });
  }
}