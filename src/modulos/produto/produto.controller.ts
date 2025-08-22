import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller('/produtos')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService,
        @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache
    ) { }

    @Post()
    async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(
            dadosProduto,
        );

        return {
            message: "Produto criado com sucesso!",
            produto: produtoCadastrado
        };
    };

    @Get()
    @UseInterceptors(CacheInterceptor)
    async listaProdutos() {
        return await this.produtoService.listaProdutos();
    };

    @Get("/:id")
    async buscaProduto(@Param("id") id: string) {
        let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(`produto-${id}`);
        if (!produto) {
            console.log("Buscando produto do banco");
            produto = await this.produtoService.buscaProduto(id);
        }
        await this.gerenciadorDeCache.set(`produto-${id}`, produto);
        return {
            message: "Produto encontrado!",
            produto
        };
    };

    @Put("/:id")
    async atualizaProduto(@Param("id") id: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);

        return {
            usuario: produtoAtualizado,
            message: "Produto atualizado com sucesso!"
        }
    };

    @Delete("/:id")
    async removeProduto(@Param("id") id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);

        return {
            usuario: produtoRemovido,
            message: "Produto removido com sucesso!"
        }
    };
};
