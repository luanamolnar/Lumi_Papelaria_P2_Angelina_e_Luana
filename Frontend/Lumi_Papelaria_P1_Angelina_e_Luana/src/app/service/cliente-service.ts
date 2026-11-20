import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8081/api/cliente';

  // Campos do backend: nome, telefone, documento, senha, logradouro, email e ativo.
  // "ativo" precisa ser 1, senão o login não funciona.
  // O backend responde com texto, por isso responseType: 'text'.
  private paraBackend(cliente: Cliente) {
    return {
      codigo: cliente.codigo,
      nome: cliente.nome,
      email: cliente.email,
      senha: cliente.senha,
      telefone: cliente.telefone,
      logradouro: cliente.endereco,
      documento: cliente.documento,
      ativo: 1
    };
  }

  // GET /api/cliente/{codigo}
  buscar(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${codigo}`);
  }

  // POST /api/cliente
  cadastrar(cliente: Cliente): Observable<string> {
    return this.http.post(this.url, this.paraBackend(cliente), { responseType: 'text' });
  }

  // PUT /api/cliente : o backend troca o registro INTEIRO,
  // então o cliente precisa vir com todos os campos preenchidos (inclusive a senha).
  alterar(cliente: Cliente): Observable<string> {
    return this.http.put(this.url, this.paraBackend(cliente), { responseType: 'text' });
  }

  // DELETE /api/cliente/{codigo}
  apagar(codigo: number): Observable<string> {
    return this.http.delete(`${this.url}/${codigo}`, { responseType: 'text' });
  }

  // POST /api/cliente/login : se e-mail/senha estiverem errados, devolve um cliente com codigo 0
  login(email: string, senha: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/login`, { email, senha });
  }

  // PATCH /api/cliente/resetarSenha : coloca a senha temporária "Senha1234" e deixa o cliente inativo
  resetarSenha(email: string): Observable<string> {
    return this.http.patch(`${this.url}/resetarSenha`, { email }, { responseType: 'text' });
  }

  // PATCH /api/cliente/alterarSenha : o backend espera a senha antiga no campo "documento"
  // e a nova no campo "senha". Se acertar, o cliente volta a ficar ativo.
  alterarSenha(email: string, senhaAntiga: string, novaSenha: string): Observable<string> {
    return this.http.patch(`${this.url}/alterarSenha`,
      { email, documento: senhaAntiga, senha: novaSenha }, { responseType: 'text' });
  }
}