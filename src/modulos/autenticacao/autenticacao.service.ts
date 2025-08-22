import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioServise: UsuarioService,
    private readonly jwtService: JwtService
  ) { }

  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioServise.buscaPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Usuario não encontrado.');
    }

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha
    )

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
