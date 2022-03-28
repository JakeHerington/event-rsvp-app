import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const data = JSON.parse(req.body);
    switch(method) {
        case 'GET':
            res.json(await read());
            break;
        case 'POST':
            res.json(await create(data));
            break;
        case 'PUT':     
            res.json(await update(data));
            break;
    }
}

export async function read() {
    return await prisma.plusOne.findMany();
}

export async function create(data) {
    if(await exists(data.id)) {
        return update(data);
    }
    else {
        return await prisma.plusOne.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                diet: data.diet,
                guest: {
                    connect: {
                        id: data.guest_id
                    }
                }
            }
        });
    }
}

export async function update(data) {
    if(await exists(data.id)) {
        return await prisma.plusOne.update({
            where: {
                id: data.id
            },
            data: {
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
    }
    else {
        return create(data);
    }
}

async function exists(id) {
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