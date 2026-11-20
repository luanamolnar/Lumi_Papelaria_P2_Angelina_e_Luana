import { ItemCesta } from './item-cesta';

export class ItemPedido {
    codigo: number = 0;
    nome: string = "";
    valor: number = 0;
    quantidade: number = 0;

    constructor(item?: ItemCesta) {
        if (item) {
            this.codigo = item.produto.codigo;
            this.nome = item.produto.nome;
            this.valor = item.produto.valor;
            this.quantidade = item.quantidade;
        }
    }

    get subtotal(): number {
        return this.valor * this.quantidade;
    }
}
