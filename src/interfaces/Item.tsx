export interface Item{
    id: string,
    conteudo: string

    selecionarItem(item: Item): void;
}