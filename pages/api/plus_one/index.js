import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const data = JSON.parse(req.body);
    switch(method) {
        case 'GET':
            res.json(await readPlusOnes());
            break;
        case 'POST':
            res.json(await createPlusOne(data));
            break;
        case 'PUT':     
            res.json(await updatePlusOne(data));
            break;
    }
}

export async function readPlusOnes() {
    return await prisma.plusOne.findMany();
}

export async function createPlusOne(data) {
    return await upsert(data);
}

export async function updatePlusOne(data) {
    return await upsert(data);
}

async function upsert(data) {
    console.log(data, data.id);
    const plusOne = await prisma.plusOne.upsert({
        where: {
            id: data.id ? data.id : 0
        },
        update: {
            first_name: data.first_name,
            last_name: data.last_name,
            diet: data.diet,
            guest: {
                connect: {
                    id: data.guest_id
                }
            }
        },
        create: {
            first_name: data.first_name,
            last_name: data.last_name,
            diet: data.diet,
            guest: {
                connect: {
                    id: data.guest_id
                }
            }
        }
    });
    return plusOne; 
}

export async function exists(id) {
    if(id) {
        const exists = await prisma.plusOne.count({
            where: {
                id: id
            },
        }).then(Boolean);
        return exists;
    }
    else {
        return false;
    }
}