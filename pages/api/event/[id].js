import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const method = req.method;
    const id = req.query.id;
    switch(method) {
        case 'GET':
            res.json(await readEvent(id));
            break;
        case 'DELETE':
            res.json(await deleteEvent(id));
            break;
    }
}
  
export async function readEvent(id) {
    return await prisma.event.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}

export async function deleteEvent(id) {
    return await prisma.event.delete({
        where: {
            id: parseInt(id)
        }
    });
}