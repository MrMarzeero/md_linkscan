import fs from 'fs';


//Extrator de links
function extractLinks(text){
    const regex = /\[([^\[\]]*)\]\((https?:\/\/[^?)(]*)\)/gm;
    const infoText = [...text.matchAll(regex)];
    const result = infoText.map((element) => ({
        [element[1]]: element[2]
    }));

    return result;
};


//Leitor de arquivo
async function collectArchive(local){
        const archive = await fs.promises.readFile(local, 'utf-8');
        const result =  extractLinks(archive);
        return result;
};

export default collectArchive;