import { ItemCesta } from './item-cesta';
import { Produto } from './produto';

export class Cesta {
    // Cesta única da loja, compartilhada entre todas as telas
    static atual: Cesta = new Cesta();

    itens: ItemCesta[] = [];

    get vazia(): boolean {
        return this.itens.length === 0;
    }

    get quantidadeTotal(): number {
        return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
    }

    get total(): number {
        return this.itens.reduce((soma, item) => soma + item.subtotal, 0);
    }

    // Adiciona o produto respeitando o estoque. Retorna false se não houver mais unidades.
    adicionar(produto: Produto, quantidade: number = 1): boolean {
        const existente = this.itens.find(i => i.produto.codigo === produto.codigo);
        const naCesta = existente ? existente.quantidade : 0;
        if (naCesta + quantidade > produto.quantidade) {
            return false;
        }
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this.itens.push(new ItemCesta(produto, quantidade));
        }
        return true;
    }

    aumentar(item: ItemCesta): void {
        if (item.quantidade < item.produto.quantidade) {
            item.quantidade++;
        }
    }

    diminuir(item: ItemCesta): void {
        if (item.quantidade > 1) {
            item.quantidade--;
        }
    }

    remover(item: ItemCesta): void {
        this.itens = this.itens.filter(i => i !== item);
    }

    esvaziar(): void {
        this.itens = [];
    }
}
