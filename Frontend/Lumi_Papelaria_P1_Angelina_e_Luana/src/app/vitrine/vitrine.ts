import { Component, inject, OnInit, signal } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Cesta } from '../model/cesta';
import { ProdutoService } from '../service/produto-service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine implements OnInit {
  lista = signal<Produto[]>([]);

  private router = inject(Router);
  private produtoService = inject(ProdutoService);

  ngOnInit() {
    this.produtoService.vitrine().subscribe(produtos => this.lista.set(produtos));
  }

  comprar(produto: Produto) {
    Cesta.atual.adicionar(produto);
    this.router.navigate(['/cesta']);
  }
}