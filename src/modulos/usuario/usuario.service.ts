import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async criaUsuario(dadosUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();

        Object.assign(usuarioEntity, dadosUsuario as UsuarioEntity);

        return await this.usuarioRepository.save(usuarioEntity);
    }

    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome, usuario.email),
        );
        return usuariosLista;
    }

    async buscaPorEmail(email: string) {
        const checkEmail = await this.usuarioRepository.findOne({
            where: { email },
        });
        if (!checkEmail) {
            new NotFoundException("Email não encontrado.")
        };
        return checkEmail;
    }

    async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado.");
        }
        
        Object.assign(usuario, novosDados as UsuarioEntity);
        await this.usuarioRepository.update(id, novosDados);
    }

    async deletaUsuario(id: string) {
        const resultado = await this.usuarioRepository.delete(id);
        if (!resultado.affected) {
            throw new NotFoundException('Usuário não encontrado');
        }
    }
}