import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;
  @IsInt()
  quantidade: number;
};

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
