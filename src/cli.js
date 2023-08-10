import fs from 'fs';
import chalk from 'chalk';
import collectArchive from './index.js';
import authVerify from './http-auth.js';
import handleError from './errors.js';

const dir = process.argv;

async function sender(file,name='',stts){
    if(stts){
        const auth = await authVerify(file);
        if(file.length === 0){
            console.log(bgBlack(name), chalk.bgRed('----->'))
            console.log(chalk.red('Não há links nesse arquivo.'))
        }else{
            console.log(auth);
        }
    }else{
        console.log(chalk.bgBlack(name), chalk.bgRed('----->'));
        console.log(file);
    };
};

function info(status){
    if(status){
        console.log('-----------------------------------------------------------------------------------------------------------------------------------------');
        console.log(chalk.white('MD LINK SCAN | VERSAO: 1.0'));
        console.log(chalk.yellow('STATUS COMUNS:'));
        console.log(chalk.green('200 -> Site OK, em funcionamento.'));
        console.log(chalk.blue('404 -> Página de site não encontrada.'));
        console.log('Para mais, confira: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses');
        console.log('-----------------------------------------------------------------------------------------------------------------------------------------');
    };
};


async function processArchive(){
    const path = dir[2];
    const stts = dir[3] === "stts";

    try{
        fs.lstatSync(path);
    }catch(err){
        return handleError(err);
};

    if(fs.lstatSync(path).isFile()){
        info(stts)
        const links = await collectArchive(path);
        sender(links,path,stts);
    } else if(fs.lstatSync(path).isDirectory()){
        const readDir = await fs.promises.readdir(path,'utf-8');
        info(stts);
        readDir.forEach(async (element) => {
            const result = await collectArchive(`${path}/${element}`);
            sender(result,element,stts);
        }); 
    };
};

processArchive();

