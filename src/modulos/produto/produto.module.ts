import { Module } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoController } from "./produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { CustomLoggerModule } from "src/recursos/interceptadores/logger-global/logger.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProdutoEntity]),
        CustomLoggerModule
    ],
    controllers: [ProdutoController],
    providers: [ProdutoRepository, ProdutoService],
})
export class ProdutoModule { }