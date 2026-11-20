import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Como o pedido é guardado no backend (só o cabeçalho, sem os itens)
export interface PedidoBackend {
  codigoPedido: number;
  valorTotal: number;
  entrega: string;
  obs: string;
  dataPedido: string;
  codigoCliente: number;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8081/api/pedido';

  // GET /api/pedido/{codigo}
  buscar(codigo: number): Observable<PedidoBackend> {
    return this.http.get<PedidoBackend>(`${this.url}/${codigo}`);
  }

  // POST /api/pedido : o backend responde com texto ("... gravado com sucesso! 3")
  gravar(valorTotal: number, entrega: string, codigoCliente: number): Observable<string> {
    const d = new Date();
    const hoje = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const corpo = { valorTotal, entrega, obs: '', dataPedido: hoje, codigoCliente };
    return this.http.post(this.url, corpo, { responseType: 'text' });
  }

  // PUT /api/pedido : altera um pedido existente
  alterar(pedido: PedidoBackend): Observable<string> {
    return this.http.put(this.url, pedido, { responseType: 'text' });
  }

  // DELETE /api/pedido/{codigo}
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.url}/${codigo}`, { responseType: 'text' });
  }
}