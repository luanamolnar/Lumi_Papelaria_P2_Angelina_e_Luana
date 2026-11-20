import { Produto } from './produto';

export class ItemCesta {
    produto: Produto;
    quantidade: number;

    constructor(produto: Produto, quantidade: number = 1) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    get subtotal(): number {
        return this.produto.valor * this.quantidade;
    }
}
