export class Produto {
    codigo: number = 0;
    nome: string = "";
    descritivo: string="";
    valor: number=0;
    quantidade: number=0;

    static catalogo: Produto[] = [
        {
            "codigo": 1,
            "nome": "Caderno",
            "descritivo": "Caderno universitário de 1 matéria, com capa dura, folhas de qualidade e disponível em várias cores.",
            "valor": 19.90,
            "quantidade": 46,
        },
        {
            "codigo": 2,
            "nome": "Lápis",
            "descritivo": "Lápis de escrever com grafite de boa qualidade, borracha na ponta e corpo confortável para o uso diário.",
            "valor": 2.90,
            "quantidade": 94,
        },
        {
            "codigo": 3,
            "nome": "Mochila",
            "descritivo": "Mochila prática e confortável, disponível em várias cores e ideal para transportar materiais escolares.",
            "valor": 49.90,
            "quantidade": 31,
        },
        {
            "codigo": 4,
            "nome": "Estojo",
            "descritivo": "Estojo compacto e prático para organizar lápis, canetas, borrachas e outros materiais escolares.",
            "valor": 19.90,
            "quantidade": 43,
        },
        {
            "codigo": 5,
            "nome": "Caneta",
            "descritivo": "Caneta esferográfica de escrita suave, disponível em várias cores e ideal para estudos e anotações.",
            "valor": 9.90,
            "quantidade": 83,
        },
        {
            "codigo": 6,
            "nome": "Calculadora",
            "descritivo": "Calculadora compacta e fácil de usar, ideal para realizar cálculos no dia a dia e levar para a escola ou faculdade.",
            "valor": 35.90,
            "quantidade": 16,
        },
        {
            "codigo": 7,
            "nome": "Grampeador",
            "descritivo": "Grampeador compacto e resistente, ideal para organizar documentos, trabalhos e folhas de forma prática.",
            "valor": 25.90,
            "quantidade": 8,
        },
        {
            "codigo": 8,
            "nome": "Estilete",
            "descritivo": "Estilete prático para cortes precisos em papel, cartolina e outros materiais, ideal para trabalhos escolares e artesanato.",
            "valor": 15.90,
            "quantidade": 11,
        },
        {
            "codigo": 9,
            "nome": "Marca-Texto",
            "descritivo": "Marca-texto com cores vibrantes, ideal para destacar informações importantes em textos, livros e anotações.",
            "valor": 5.90,
            "quantidade": 56,
        },
        {
            "codigo": 10,
            "nome": "Lápis de Cor",
            "descritivo": "Kit de lápis de cor com diferentes tonalidades, ideal para desenhos, atividades escolares e trabalhos criativos.",
            "valor": 21.90,
            "quantidade": 35,
        },
        {
            "codigo": 11,
            "nome": "Borracha em Bastão",
            "descritivo": "Borracha em bastão prática e fácil de usar, ideal para apagar escritas a lápis com precisão e manter o estojo organizado.",
            "valor": 5.90,
            "quantidade": 19,
        },
        {
            "codigo": 12,
            "nome": "Régua",
            "descritivo": "Régua resistente e fácil de transportar, ideal para medir, traçar linhas e auxiliar em atividades escolares.",
            "valor": 10.90,
            "quantidade": 23,
        },
    ];

    static buscarPorCodigo(codigo: number): Produto | undefined {
        return Produto.catalogo.find(p => p.codigo === codigo);
    }

    // Procura pelo nome ou pelo descritivo, sem diferenciar maiúsculas/minúsculas nem acentos
    static pesquisar(termo: string): Produto[] {
        const t = Produto.normalizar(termo);
        if (t === "") {
            return [];
        }
        return Produto.catalogo.filter(p =>
            Produto.normalizar(p.nome).includes(t) ||
            Produto.normalizar(p.descritivo).includes(t));
    }

    private static normalizar(texto: string): string {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }
}
