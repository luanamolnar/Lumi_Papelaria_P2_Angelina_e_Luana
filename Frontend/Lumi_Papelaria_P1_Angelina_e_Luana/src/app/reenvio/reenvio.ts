import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClienteService } from '../service/cliente-service';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-reenvio',
  styleUrl: './reenvio.css',
  templateUrl: './reenvio.html',
})
export class Reenvio {
  private clienteService = inject(ClienteService);

  etapa = signal(1);
  email = '';
  senhaTemporaria = '';
  novaSenha = '';
  mensagem = signal('');
  erro = signal('');

  // Etapa 1: pede ao backend para resetar a senha
  resetar() {
    this.erro.set('');
    this.clienteService.resetarSenha(this.email).subscribe({
      next: () => this.etapa.set(2),
      error: () => this.erro.set('Não foi possível falar com o servidor. O backend está ligado?')
    });
  }

  // Etapa 2: troca a senha temporária pela nova.
  // O backend responde a mesma coisa mesmo quando erra, então confirmamos fazendo login com a senha nova.
  trocar() {
    this.erro.set('');
    this.clienteService.alterarSenha(this.email, this.senhaTemporaria, this.novaSenha).pipe(
      switchMap(() => this.clienteService.login(this.email, this.novaSenha))
    ).subscribe({
      next: cliente => {
        if (cliente.codigo > 0) {
          this.mensagem.set('Senha alterada com sucesso! Agora é só fazer o login.');
        } else {
          this.erro.set('E-mail ou senha temporária incorretos.');
        }
      },
      error: () => this.erro.set('Não foi possível falar com o servidor. O backend está ligado?')
    });
  }
}