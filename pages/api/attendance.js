import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
    const data = JSON.parse(req.body);

    const updatedGuest = await prisma.guest.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        attending: data.attending,
      },
    });

    res.json(updatedGuest);
}