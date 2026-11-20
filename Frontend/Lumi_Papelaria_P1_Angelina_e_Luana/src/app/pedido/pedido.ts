import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { Cesta } from '../model/cesta';
import { Cliente } from '../model/cliente';
import { Pedido as PedidoModel } from '../model/pedido';
import { PedidoService } from '../service/pedido-service';
import { ProdutoService } from '../service/produto-service';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-pedido',
  styleUrl: './pedido.css',
  templateUrl: './pedido.html',
})
export class Pedido {
  private pedidoService = inject(PedidoService);
  private produtoService = inject(ProdutoService);

  cesta = Cesta.atual;
  logado = Cliente.logado;
  cliente = new Cliente();

  confirmado = signal<PedidoModel | null>(null);
  erro = signal('');
  enviando = signal(false);

  constructor() {
    // já preenche nome e telefone com os dados de quem fez login
    if (this.logado) {
      this.cliente.nome = this.logado.nome;
      this.cliente.telefone = this.logado.telefone;
    }
  }

  finalizar() {
    if (this.cesta.vazia || !this.logado) {
      return;
    }
    this.erro.set('');
    this.enviando.set(true);

    this.pedidoService.gravar(this.cesta.total, this.cliente.endereco, this.logado.codigo).subscribe({
      next: texto => {
        // guarda os produtos antes de a cesta ser esvaziada
        const produtos = this.cesta.itens.map(item => item.produto);

        // monta o pedido na tela, baixa o estoque local e esvazia a cesta
        const pedido = PedidoModel.finalizar(this.cesta, this.cliente);
        const numero = /(\d+)\s*$/.exec(texto);
        pedido.numero = numero ? Number(numero[1]) : 0;

        // grava no banco o novo estoque de cada produto comprado
        forkJoin(produtos.map(p => this.produtoService.alterar(p)))
          .pipe(catchError(() => of(null)))
          .subscribe(() => {
            this.enviando.set(false);
            this.confirmado.set(pedido);
          });
      },
      error: () => {
        this.enviando.set(false);
        this.erro.set('Não foi possível gravar o pedido. O backend está ligado?');
      }
    });
  }
}