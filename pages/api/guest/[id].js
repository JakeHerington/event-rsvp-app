import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const id = req.query.id;
    switch(method) {
        case 'GET':
            res.json(await read(id));
            break;
        case 'DELETE':
            res.json(await deleteRecord(id));
            break;
    }
}
  
export async function read(id) {
    return await prisma.guest.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}

export async function deleteRecord(id) {
    return await prisma.guest.delete({
        where: {
            id: parseInt(id)
        }
    });
}