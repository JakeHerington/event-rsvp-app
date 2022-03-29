import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const id = req.query.id;
    switch(method) {
        case 'GET':
            res.json(await readGuest(id));
            break;
        case 'DELETE':
            res.json(await deleteGuest(id));
            break;
    }
}
  
export async function readGuest(id) {
    return await prisma.guest.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}

export async function deleteGuest(id) {
    return await prisma.guest.delete({
        where: {
            id: parseInt(id)
        }
    });
}