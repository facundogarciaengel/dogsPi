const {Router} = require('express'); 
const axios = require('axios'); 
const {Dog,Temperament} = require('../db'); 

const router = Router(); 

const getApiInfo = async()=>{
    const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds');
    
        let allApiInfo = await apiInfo.data.map(el =>{
            return {
                id : el.id, 
                name: el.name, 
                height: el.height.metric, 
                weight: el.weight.metric, 
                life_span: el.life_span,
                image: el.image.url
            }
        })

        return allApiInfo ;
    }

const getDbInfo = async() =>{
    return await Dog.findAll({
        include: {
            //incluyo el modelo Temperament con los atributos que necesito 
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
 
}

const infoTotal = async() =>{
    const dogApiInfo = await getApiInfo(); 
    const dogDbInfo = await getDbInfo(); 
    const infoConcat = dogApiInfo.concat(dogDbInfo); 
    return infoConcat; 
}

router.get('/dogs', async(req,res,next)=>{
    let {name} = req.query; 
    let allDogs = await infoTotal(); 
    if(name){
        let dogName = await allDogs.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length? res.status(200).json(dogName)
        : res.status(404).send({message:"That name was not found, sorry"}); 
    }
    else{
        res.status(200).json(allDogs);
    }
})

// vamos por la parte de traer todos los temperamentos y ver que no se repitan o que quede lindo
// falta tambien guardarlos en la base de datos 
// pensar que si los guardo ahi puedo filtrarlos con el metodo de sqlize

router.get('/temperament', async(req,res,next)=>{
    let temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    let temperaments = temperamentsApi.data.map(el => el.temperament)
     //console.log(temperaments); 
     const tempEach = temperaments.map(el => {
        // for (let i = 0; i < el.length; i++) 
        return el
    })
    tempEach.forEach(el => {
        Temperament.findOrCreate({ where: { name: el } }) // las guardo en la base de datos 
    })
    const allTemperaments = await Temperament.findAll();  // las traigo de la base de datos 
   // console.log(allTemperaments)
    res.send(allTemperaments) // 
    
    })

router.post('/dog', async(req,res,next)=>{
    const { name, height, weight,life_span, image, temperaments } = req.body 

let dogCreated = await Dog.create({
    name,
    height,
    weight,
    life_span, 
    image
})


// let temperamentDb = await Temperament.findAll({
//     where: { name : temperaments }
// });
let temperamentDb = await Temperament.findAll({
    where: { name : temperaments }
}); 

dogCreated.addTemperament(temperamentDb)  
console.log(temperamentDb); 
console.log("Todo el perro creado es :", dogCreated.dataValues); 
res.send("Perro creado con exito"); 

// if (temperaments.length) {
//     temperaments.map(async (tem) => {
//     console.log(tem);
//         let temperamentDb = await Temperament.findOrCreate({ where: { name: tem } });
//         // console.log(temper.dataValues.name);
//         dogCreated.addTemperament(temperamentDb);
//         // res.send(dogCreated);
//         console.log("Perro Cargado");
//     })
// }

 
//     res.send("dog succesfuly created"); 

})

router.get('/dogs/:id', async(req,res,next)=>{
    const {id} = req.params; 
    const dogsTotal = await infoTotal(); 
    if(id){
        let dogId = await dogsTotal.filter(el => el.id == id)
        dogId.length ? res.status(200).json(dogId)
        : res.status(404).send("No se encontro la raza de perro") 
    }
})




module.exports = router; 