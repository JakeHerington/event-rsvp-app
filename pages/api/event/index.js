import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const data = JSON.parse(req.body);
    switch(method) {
        case 'GET':
            res.json(readEvents());
            break;
        case 'POST':
            res.json(creatEevent(data));
            break;
        case 'PUT':     
            res.json(updateEvent(data));
            break;
    }
}

export async function readEvents() {
    return await prisma.event.findMany();
}

export async function createEvent(data) {
    return await upsert(data);
}

export async function updateEvent(data) {
    return await upsert(data);
}

async function upsert(data) {
    const event = await prisma.event.upsert({
        where: {
            id: data.id ? data.id : 0
        },
        update: {
            name: data.name,      
            date: data.date,
            description: data.description,
            date_updated: now(),      
        },
        create: {
            name: data.name,      
            date: data.date,
            description: data.description,
        }
    });
    return event; 
}

export async function exists(id) {
    if(id) {
        const exists = await prisma.event.count({
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