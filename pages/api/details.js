import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
    const data = JSON.parse(req.body)

    const updatedGuest = await prisma.guest.update({
        where: {
            id: parseInt(data.id),
        },
        data: {
            email: data.email,
            diet: data.diet,
            comment: data.comment,
        },
    });

    res.json(updatedGuest);
}