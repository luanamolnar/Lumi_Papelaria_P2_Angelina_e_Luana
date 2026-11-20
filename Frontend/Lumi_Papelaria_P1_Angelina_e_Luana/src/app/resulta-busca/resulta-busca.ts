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
  selector: 'app-resulta-busca',
  styleUrl: './resulta-busca.css',
  templateUrl: './resulta-busca.html',
})
export class ResultaBusca {
  private rota = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);

  // o termo digitado na barra de pesquisa vem na URL: /resultado-busca?q=caderno
  private termo$ = this.rota.queryParamMap.pipe(map(p => p.get('q') ?? ''));

  termo = toSignal(this.termo$, { initialValue: '' });

  lista = toSignal(
    this.termo$.pipe(
      switchMap(termo =>
        termo.trim() === ''
          ? of([] as Produto[])
          : this.produtoService.pesquisar(termo.trim()).pipe(catchError(() => of([] as Produto[])))
      )
    ),
    { initialValue: [] as Produto[] }
  );

  comprar(produto: Produto) {
    Cesta.atual.adicionar(produto);
    this.router.navigate(['/cesta']);
  }
}