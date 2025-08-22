import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ProdutoEntity } from "../produto.entity";


export class ImagemProdutoDTO {
    id: string;

    @IsString()
    @IsUrl(undefined, { message: 'URL para imagem inválida' })
    url: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    descricao: string;

    produto: ProdutoEntity;
}