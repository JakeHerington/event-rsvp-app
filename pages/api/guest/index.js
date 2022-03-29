import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const data = JSON.parse(req.body);
    switch(method) {
        case 'GET':
            res.json(readGuests());
            break;
        case 'POST':
            res.json(createGuest(data));
            break;
        case 'PUT':     
            res.json(updateGuest(data));
            break;
    }
}

export async function readGuests() {
    return await prisma.guest.findMany();
}

export async function createGuest(data) {
    return await upsert(data);
}

export async function updateGuest(data) {
    return await upsert(data);
}

async function upsert(data) {
    const guest = await prisma.guest.upsert({
        where: {
            id: data.id ? data.id : 0
        },
        update: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            attending: data.attending,
            diet: data.diet,
            comment: data.comment
        },
        create: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            attending: data.attending,
            diet: data.diet,
            comment: data.comment,
            event: {
                connect: {
                    id: data.event_id,
                }
            }
        }
    });
    return guest; 
}

export async function exists(id) {
    if(id) {
        const exists = await prisma.guest.count({
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