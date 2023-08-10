import chalk from 'chalk';

function handleError(erro){
    if(erro.code === 'ENOENT'){
        console.log(chalk.red('ERRO ENOENT. Diretório ou arquivo enviado não existente.'));
        return;
    } else if(erro.code === 'ENOTFOUND'){
        console.log(chalk.red('ERRO ENOTFOUND. Algum site não existente ou houve algum erro.'));
    } else if(erro.code === 'ERR_INVALID_ARG_TYPE'){
        console.log(chalk.red('ERRO ERR_INVALID_ARG_TYPE. Não foi recebido arquivo ou diretório.'));
    } else{
        console.log(chalk.red(`ERRO ${erro.code}. Ocorreu um erro desconhecido, contate um suporte.`))
    };
};

export default handleError;
