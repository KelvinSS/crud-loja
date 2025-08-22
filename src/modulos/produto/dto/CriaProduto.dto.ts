import { ArrayMinSize, IsArray, IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsUUID, Length, Min, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./ImagemProduto.dto";
import { Type } from "class-transformer";

export class CriaProdutoDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
    nome: string;

    @IsPositive({ message: 'O valor precisa ser positivo.' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: 'O valor precisa ter no máximo 2 casas decimais.' })
    valor: number;

    @IsPositive({ message: 'A quantidade precisa ser positiva.' })
    quantidadeDisponivel: number;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
    @Length(3, 1000, { message: 'A descrição precisa ter entre 3 e 1000 caracteres.' })
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3, { message: 'O produto precisa ter no mínimo 3 características.' })
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1, { message: 'O produto precisa ter no mínimo 1 imagem.' })
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({ message: 'A categoria não pode ser vazia.' })
    categoria: string;
}