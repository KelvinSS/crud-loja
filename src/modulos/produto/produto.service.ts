import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService {
    buscaProduto(id: string): ProdutoEntity | PromiseLike<ProdutoEntity | undefined> | undefined {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find();
        const produtosLista = produtosSalvos.map(
            (produto) => new ListaProdutoDTO(produto.id, produto.nome),
        );
        return produtosLista;
    }

    async listaUmProduto(id: string) {
        const produtoSalvo = await this.produtoRepository.findOneBy({ id });
        if (!produtoSalvo) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produtoSalvo;
    }

    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const entityName = await this.produtoRepository.findOneBy({ id });
        if (!entityName) {
            throw new NotFoundException('Produto não encontrado');
        }

        Object.assign(entityName, novosDados as ProdutoEntity);
        await this.produtoRepository.save(entityName);
    }

    async deletaProduto(id: string) {
        const entityName = await this.produtoRepository.findOneBy({ id });
        if (!entityName) {
            throw new NotFoundException('Produto não encontrado');
        }
        await this.produtoRepository.delete(id);
    }
}