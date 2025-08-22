import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class filtroDeExcecaoGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNativo: ConsoleLogger
  ) { }

  catch(excecao: unknown, host: ArgumentsHost) {
    this.loggerNativo.error(excecao)

    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    if ("usuario" in requisicao) {
      this.loggerNativo.log(`Usuário: ${requisicao.usuario.sub}`)
    }

    const { status, body } =
      excecao instanceof HttpException
        ? {
          status: excecao.getStatus(),
          body: excecao.getResponse()
        }
        : {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(requisicao),
            message: 'Erro interno do servidor'
          }
        }

    httpAdapter.reply(resposta, body, status);
  };
};
