import { faker } from "@faker-js/faker"

const review=Array.from({length:2}).map((item,index)=>{
    return{
        id: index,
        reviewDate: new Date(faker.date.past()).toUTCString(),
        reviewer:{
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            photoUrl: faker.image.avatar(),
        },
        
        dish:{
            name: faker.commerce.productName(),
            type: faker.commerce.productMaterial(),
            photoUrl: faker.image.food(),
        },
        restaurantName: faker.company.name(),
        finalScore: faker.finance.amount(0,5),
        scores:{
            taste:{
                expectations: faker.finance.amount(0,5),
                flavor: faker.finance.amount(0,5),
            },
            presentation:{
                firstImpresion: faker.finance.amount(0,5),
                plating: faker.finance.amount(0,5),
            },
            quantity:{
                satietyLevel: faker.finance.amount(0,5),
                garnishes: faker.finance.amount(0,5),
            }
        },
        page:1,
        pages:1,
        limit:1
    }}
)

export default review;