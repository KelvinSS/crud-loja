import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';
import { CriaPedidoDTO } from './dto/CriaProduto.dto';
import { ItemPedidoEntity } from './itemPedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) { }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  private trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      if (!produtoRelacionado) {
        throw new NotFoundException(`Produto com ID ${itemPedido.produtoId} não encontrado`);
      }

      if (itemPedido.quantidade <= 0) {
        throw new BadRequestException('Quantidade inválida');
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`Quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto com ID ${itemPedido.produtoId}`);
      }
    });
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);
    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);

    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) })
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    pedidoEntity.usuario = usuario;

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades;

    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });

  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO, usuarioId: string) {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id },
      relations: { usuario: true },
    });
    //throw new Error("Simula erro BD");

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    if (pedido.usuario.id !== usuarioId) {
      throw new Error('Operação não permitida');
    }

    Object.assign(pedido, dto as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }
}
