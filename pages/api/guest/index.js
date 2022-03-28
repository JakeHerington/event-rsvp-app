import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const data = JSON.parse(req.body);
    switch(method) {
        case 'GET':
            res.json(read());
            break;
        case 'POST':
            res.json(create(data));
            break;
        case 'PUT':     
            res.json(update(data));
            break;
    }
}

export async function read() {
    return await prisma.guest.findMany();
}

export async function create(data) {
    if(await exists(data.id)) {
        return update(data);
    }
    else {
        return await prisma.guest.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                address: data.address,
                attending: data.attending,
                diet: data.diet,
                comment: data.comment
            }
        });
    }
}

export async function update(data) {
    if(exists(data.id)) {
        return await prisma.guest.update({
            where: {
                id: data.id
            },
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                address: data.address,
                attending: data.attending,
                diet: data.diet,
                comment: data.comment
            }
        });
    }
    else {
        return create(data);
    }
}

async function exists(id) {
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