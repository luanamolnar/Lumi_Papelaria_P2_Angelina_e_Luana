import { Cesta } from './cesta';
import { Cliente } from './cliente';
import { ItemPedido } from './item-pedido';

export class Pedido {
    // Pedidos já realizados
    static lista: Pedido[] = [];

    numero: number = 0;
    data: Date = new Date();
    cliente: Cliente = new Cliente();
    itens: ItemPedido[] = [];

    get total(): number {
        return this.itens.reduce((soma, item) => soma + item.subtotal, 0);
    }

    // Transforma a cesta em um pedido, baixa o estoque e esvazia a cesta
    static finalizar(cesta: Cesta, cliente: Cliente): Pedido {
        const pedido = new Pedido();
        pedido.numero = Pedido.lista.length + 1;
        pedido.data = new Date();
        pedido.cliente = cliente;
        pedido.itens = cesta.itens.map(item => new ItemPedido(item));

        cesta.itens.forEach(item => item.produto.quantidade -= item.quantidade);
        cesta.esvaziar();

        Pedido.lista.push(pedido);
        return pedido;
    }
}
