import fs from 'fs';

let compribacion=0;

    const getCharacters = async ()=>{
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character`)
            const data = await response.json();
            await fs.promises.writeFile('data.txt',JSON.stringify(data,null,'\t'))
            console.log(data.results[0].name); 
            setTimeout(()=>{
                Edition()
            },500)

        } catch (error) {
            console.log(error)
            console.log('El No se ha podido descargar el archivo desde la API, se procedera a leer los datos desde el TXT de respaldo')
            getCharacters2()
            
        }
    }


    let getCharacters2 = async ()=>{
        try {
            const response =  await fs.promises.readFile('.src/files//data.json','utf-8');
            let data=JSON.parse(response)
            setTimeout(()=>{
                Edition()
            },500)
        } catch (error) {
            console.log(error)
            console.log('El No se ha podido leer los archivos, intente mas tarde o notifiquenos')
        }
    }

setTimeout(()=>{
    getCharacters()
},500)


function Edition(){

    let NewCharacter = {
        nombre: 'Evil Morty',
        especie: 'Evil Human',
        estado: 'Alive',

    }

    let modifycharacters= new Characters()
    setTimeout(()=>{
        modifycharacters.getAll()
    },10)

    // setTimeout(()=>{
    //     modifycharacters.SaveCharacter(NewCharacter)
    // },1000)
    // setTimeout(()=>{
    //     modifycharacters.getById(333)
    //     modifycharacters.getById(12)
    // },2000)
    // setTimeout(()=>{
    //     modifycharacters.deleteById(5)
    // },3000)
    // setTimeout(()=>{
    //     modifycharacters.deleteAll()
    // },5000)

}
export class Characters{ 

        getAll =async()=>{
            const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
            return JSON.parse(response)
        }
    

    SaveCharacter = async(NewCharacter) =>{
        try {
            const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
            let data=JSON.parse(response)

            if(data.length === 0){
                NewCharacter.id=1;
                data.push(NewCharacter);
                await fs.promises.writeFile('src/files/data3.json', JSON.stringify(data, null, '\t'))
            }else{
                NewCharacter.id = data[data.length-1].id+1;
                data.push(NewCharacter);
                await fs.promises.writeFile('src/files/data3.json', JSON.stringify(data, null, '\t'))
                console.log(`${NewCharacter.nombre} Fue registrado Exitosamente con el ID: ${NewCharacter.id}`)
            }
        } catch (error) {
            console.log('No se pudo escribir: ' + error)
        }
    }

    getById =async(id)=>{
        try {
            const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
            let data=JSON.parse(response)
            console.log(data)
                if(data[id-1]!= null||data[id-1]!= undefined){ 
                    console.log(`El personaje ${id} es ${data[id-1].nombre}`)
                }else{
                    console.log(`No se encontro al personaje ${id}`)
                    return null
                }
            
        } catch (error) {
            console.log('No se pudo buscar: ' + error)
        }
    }

    deleteById = async(id) =>{
        try{
            const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
            let data=JSON.parse(response) 
            data.splice(id-1,1)
            await fs.promises.writeFile('src/files/data4.json', JSON.stringify(data[id], null, '\t'))
            console.log(`El personaje ${id} fue eliminado correctamente`)
            console.log(data)
        }catch(error){
            console.log('No se puedo eliminar: ', error)
        }
    }

    // deleteAll = async() =>{
    //     try{
    //         const response =  await fs.promises.readFile('./src/files/data3.json','utf-8');
    //         let data=JSON.parse(response) 
    //         data.splice(0,data.length)
    //         await fs.promises.writeFile('src/files/data4.json', JSON.stringify(data, null, '\t'))
    //         console.log(`Todos los personajes fueron eliminados (en el ultimo archivo)`)
    //         console.log(data)
    //             setTimeout(()=>{
    //             fs.unlink('./src/files/data3.json',error =>{
    //                 if (error){
    //                     console.log('hubo un error')
    //                 }else{
    //                     console.log('Eliminado')
    //                 }
    //             })
    //         },1000)
    //         setTimeout(()=>{
    //             fs.unlink('./src/files/data2.json',error =>{
    //                 if (error){
    //                     console.log('hubo un error')
    //                 }else{
    //                     console.log('Eliminado')
    //                 }
    //             })
    //         },1000)
    //         setTimeout(()=>{
    //             fs.unlink('./src/files/data4.json',error =>{
    //                 if (error){
    //                     console.log('hubo un error')
    //                 }else{
    //                     console.log('Eliminado')
    //                 }
    //             })
    //         },1000)
    //     }catch(error){
    //         console.log('No se puedo eliminar: ', error)
    //     }
    // }
}

