import faker from 'faker'

faker.locale = 'es'

 const get = () => ({
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    imagen: faker.image.abstract()
})
export default {get}