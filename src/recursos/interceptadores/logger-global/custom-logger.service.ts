import { ConsoleLogger, Injectable } from "@nestjs/common";


@Injectable()
export class CustomLogger extends ConsoleLogger {
    formataLog(nome, quantidade, valor) {
        return `LOCAL: ${this.context} - Nome: ${nome}, Quantidade: ${quantidade}, Preço: ${valor} - TIMESTAMP ${this.getTimestamp()}`
    }
}