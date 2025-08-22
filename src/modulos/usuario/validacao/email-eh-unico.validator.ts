import { Injectable, NotFoundException } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(private usuarioService: UsuarioService) { }

    async validate(value: any): Promise<boolean> {
        try {
            const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
                value,
            );
            return !usuarioComEmailExiste;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return true;
            }
            throw error;
        }
    }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator,
        });
    };
};