import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req, res) {

  const data = req.query.id;

  const guest = await prisma.guest.findUnique({
    where: {
      id: parseInt(data),
    },
  });

  res.json(guest);
}