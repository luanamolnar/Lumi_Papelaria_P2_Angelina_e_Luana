Sobre o projeto

Loja virtual de papelaria feita em Angular, integrada à API REST **lojinha** fornecida pelo professor (Spring Boot + SQLite). O backend não foi alterado. Os dados de produtos, clientes e pedidos agora vêm da API e são gravados no banco.


Requisitos

- JDK 21
- Node.js compatível com Angular 22 e npm
- (opcional) Postman, para testar a API


Como executar

Suba primeiro o backend e depois o frontend, cada um em um terminal.

1. Backend (porta 8081)

```bash
cd backend
.\mvnw.cmd spring-boot:run      # Windows
./mvnw spring-boot:run          # Linux / macOS
```

Também funciona abrindo a pasta `backend` no VS Code e clicando em **Run** em `LojinhaApplication.java`.


1. Frontend (porta 4200)

```bash
cd frontend
npm install        # somente na primeira vez
npm start
```

Também funciona abrindo o terminal no `angular.json` e fazendo o npm install, npm start, ng serve

Abra http://localhost:4200


Integração com o backend

Os services ficam em `frontend/src/app/service/`.

| Entidade | Endpoint | Onde é usado |
|---|---|---|
| Produto | `GET /api/produto/vitrine` | Vitrine |
| Produto | `GET /api/produto/{codigo}` | Detalhe do produto |
| Produto | `GET /api/produto/busca/{termo}` | Busca |
| Produto | `PUT /api/produto` | Baixa de estoque ao finalizar o pedido |
| Cliente | `POST /api/cliente` | Cadastro |
| Cliente | `POST /api/cliente/login` | Login |
| Cliente | `PATCH /api/cliente/resetarSenha` e `/alterarSenha` | Esqueci minha senha |
| Pedido | `POST /api/pedido` | Finalizar pedido |
| Pedido | `GET /api/pedido/{codigo}` | Meus pedidos |

Os services também implementam os demais métodos documentados nos PDFs: produto (`GET /api/produtos`, `POST`, `DELETE`), cliente (`GET`, `PUT`, `DELETE`) e pedido (`PUT`, `DELETE`).


Fluxo para testar no navegador

1. **Vitrine**: produtos carregados da API. Use **Ver Produto** para abrir o detalhe.
2. **Busca**: digite um termo (por exemplo, `caderno`) na barra de pesquisa.
3. **Cadastro**: formulário com validação (senha forte, CPF e telefone obrigatórios).
4. **Login**: com e-mail e senha cadastrados.
5. **Cesta**: adicione produtos, veja o total e remova itens.
6. **Finalizar pedido**: informe o endereço de entrega e confirme. O pedido é gravado no banco e o estoque dos produtos é atualizado.
7. **Meus Pedidos**: mostra os pedidos feitos na sessão atual.
8. **Esqueci minha senha**: informe o e-mail e depois troque a senha temporária por uma nova.


Observações e limitações

- O backend grava apenas o cabeçalho do pedido (valor, entrega, data e cliente). A ligação com os itens está comentada no código fornecido, então os itens aparecem na tela de confirmação, mas não ficam gravados no banco.
- O backend não envia e-mail (está marcado como TODO na documentação). Por isso a tela de recuperação de senha informa a senha temporária `Senha1234`. O reset deixa o cliente inativo até a senha ser alterada. O `alterarSenha` do backend espera a senha antiga no campo `documento`, e o frontend já trata isso.
- O backend não tem listagem de pedidos por cliente. "Meus Pedidos" consulta na API cada pedido feito na sessão atual.
- O login e a cesta ficam apenas em memória. Recarregar a página (F5) limpa os dois.
- A busca diferencia acentos (`lapis` não encontra `Lápis`). Isso vem da consulta do backend.
- O CPF é validado só no formato.
- A mensagem "Cliente gravado com sucesso" na gravação de pedido vem do backend e já consta como inconsistência na documentação.