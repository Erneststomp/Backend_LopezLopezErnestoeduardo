import fs from 'fs';
export class Characters{ 
    getAll =async()=>{
        const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
        return JSON.parse(response)
    }
}
