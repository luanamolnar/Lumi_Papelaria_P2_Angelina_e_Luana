import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { Produto } from '../model/produto';
import { Cesta } from '../model/cesta';
import { ProdutoService } from '../service/produto-service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
})
export class Detalhe {
  private rota = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);

  // o código do produto vem na URL: /detalhe?codigo=1
  // o backend devolve um produto com codigo 0 quando não encontra
  produto = toSignal(
    this.rota.queryParamMap.pipe(
      map(p => Number(p.get('codigo'))),
      switchMap(codigo =>
        this.produtoService.buscar(codigo).pipe(catchError(() => of(undefined)))
      ),
      map(p => (p && p.codigo > 0 ? p : undefined))
    ),
    { initialValue: undefined }
  );

  mensagem: string = "";

  comprar(produto: Produto) {
    if (Cesta.atual.adicionar(produto)) {
      this.router.navigate(['/cesta']);
    } else {
      this.mensagem = "Você já colocou na cesta todas as unidades disponíveis deste produto.";
    }
  }
}