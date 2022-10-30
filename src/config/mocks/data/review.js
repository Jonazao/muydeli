import { faker } from "@faker-js/faker"

const review=Array.from({length:2}).map((item,index)=>{
    return{
        id: index,
        reviewDate: faker.date.past(),
        reviewer:{
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        },
        dish:{
            name: faker.lorem.word({length:{min:5,max:7}}),
            type: faker.lorem.word({length:{min:5,max:7}}),
        },
        restaurantName: faker.company.name(),
        finalScore: faker.finance.amount({min:0,max:5}),
        scores:{
            flavor:{
                expected: faker.finance.amount({min:0,max:5}),
                liking: faker.finance.amount({min:0,max:5}),
            },
            presentation:{
                firstImpresion: faker.finance.amount({min:0,max:5}),
                plated: faker.finance.amount({min:0,max:5}),
            },
            amount:{
                satietyLevel: faker.finance.amount({min:0,max:5}),
                sideDishes: faker.finance.amount({min:0,max:5}),
            }
        },
        pages:1,
        limit:1
    }}
)

export default review;