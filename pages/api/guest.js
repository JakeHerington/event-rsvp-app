import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
  const id = req.query.id;
  const data = getData(id);
  res.json(data);
}

export async function getData(id) {
  const guest = await prisma.guest.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return guest;
}