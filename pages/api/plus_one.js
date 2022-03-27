import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
  const data = JSON.parse(req.body)

  const plusOne = await prisma.plusOne.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      diet: data.diet,
      guest_id: data.guest_id,
    },
  });

  res.json(plusOne);
}