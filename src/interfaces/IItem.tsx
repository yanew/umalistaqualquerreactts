export interface IItem{
    id: string,
    conteudo: string

    selecionaItem(item: IItem): Promise<void>;
}