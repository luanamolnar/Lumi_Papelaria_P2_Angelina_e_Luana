import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { Pedido as PedidoModel } from '../model/pedido';
import { PedidoBackend, PedidoService } from '../service/pedido-service';

interface Linha {
  local: PedidoModel;
  salvo: PedidoBackend | null;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-lista-pedidos',
  styleUrl: './lista-pedidos.css',
  templateUrl: './lista-pedidos.html',
})
export class ListaPedidos implements OnInit {
  private pedidoService = inject(PedidoService);

  linhas = signal<Linha[]>([]);
  carregado = signal(false);

  ngOnInit() {
    const locais = PedidoModel.lista.filter(p => p.numero > 0);
    if (locais.length === 0) {
      this.carregado.set(true);
      return;
    }
    // busca no backend cada pedido feito nesta sessão
    forkJoin(locais.map(p => this.pedidoService.buscar(p.numero).pipe(catchError(() => of(null)))))
      .subscribe(salvos => {
        this.linhas.set(locais.map((p, i) => ({ local: p, salvo: salvos[i] })));
        this.carregado.set(true);
      });
  }
}