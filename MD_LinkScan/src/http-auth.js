import handleError from "./errors.js";
import chalk from "chalk";

function handleErrorLocal(erro){
    if(erro.code==='ENOTFOUND' || erro.code === undefined){
        console.log(chalk.red('Não conseguimos encontrar algum site.'))
        return 'null'
    } else{
        handleError(erro);
    };
}




function transformToUrl(linksList){
    const url = linksList.map((element) => {
        return Object.values(element).join();
    });

    return url
};

async function statusVerify(urlList){
    const status = Promise.all(
        urlList.map(async (url) => {
            try{
                const verify = await fetch(url);
                return verify.status;
            } catch(err){
                return handleErrorLocal(err);
            };
        })
    );

    return status;
};


async function authVerify(linksList){
    const urlist = transformToUrl(linksList);
    const statusUrl = await statusVerify(urlist);
    

    const finalStatus = linksList.map((object, i) => ({
        ...object,
        status: statusUrl[i]
    }));

    return finalStatus;


};

export default authVerify;

//[gatinho salsicha](http://gatinhosalsicha.com.br/)