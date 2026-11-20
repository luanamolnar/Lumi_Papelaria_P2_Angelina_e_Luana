import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8081/api';

  // GET /api/produto/vitrine : só os produtos em destaque
  vitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produto/vitrine`);
  }

  // GET /api/produtos : todos os produtos
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produtos`);
  }

  // GET /api/produto/{codigo}
  buscar(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/produto/${codigo}`);
  }

  // GET /api/produto/busca/{termo}
  pesquisar(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produto/busca/${encodeURIComponent(termo)}`);
  }

  // POST /api/produto : cadastra um produto novo
  gravar(produto: Produto): Observable<string> {
    return this.http.post(`${this.url}/produto`, produto, { responseType: 'text' });
  }

  // PUT /api/produto : altera um produto (usado para baixar o estoque depois de uma compra)
  alterar(produto: Produto): Observable<string> {
    return this.http.put(`${this.url}/produto`, produto, { responseType: 'text' });
  }

  // DELETE /api/produto/{codigo}
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.url}/produto/${codigo}`, { responseType: 'text' });
  }
}