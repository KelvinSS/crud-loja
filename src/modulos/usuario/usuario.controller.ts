import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { HashearSenhaPipe } from "../../recursos/pipes/hashear-senha.pipe";

@Controller("/usuarios")
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) { }

    @Post()
    async criaUsuario(
        @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
        @Body("senha", HashearSenhaPipe) senhaHasehada: string
    ) {
        const usuarioCriado = await this.usuarioService.criaUsuario({ ...dadosDoUsuario, senha: senhaHasehada });

        return {
            usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome, usuarioCriado.email),
            message: "Usuário criado com sucesso!"
        };
    };

    @Get()
    async listaUsuarios() {
        const usurio = await this.usuarioService.listUsuarios();
        return usurio;
    };

    @Put("/:id")
    async atualizaUsuario(@Param("id") id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);

        return {
            usuario: usuarioAtualizado,
            message: "Usuário atualizado com sucesso!"
        }
    };

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string) {
        const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

        return {
            usuario: usuarioRemovido,
            message: "Usuário removido com sucesso!"
        }
    };
};
