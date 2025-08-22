import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticaDTO {
    @IsEmail(undefined, { message: 'O e-mail informado é inválido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
    senha: string;
}
