import { CATEGORIES } from "@/lib/constants"
import { prisma } from "@/lib/prisma"
import { fakerID_ID as faker } from "@faker-js/faker"

const main = async () => {
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()

  Array.from({ length: CATEGORIES.length }).map(async (_, i) => {
    const paragraph = faker.lorem.paragraphs(7)
    const content = paragraph
      .split("\n")
      .map((p) => `<p>${p}</p>`)
      .join("")
    const title = faker.lorem.sentence({ min: 6, max: 9 }).replace(/\.$/, "")
    const date = faker.date.recent()
    const slug = title.replace(/ /g, "-").toLowerCase() + `-${date.getTime()}`

    await prisma.post.create({
      include: {
        category: true,
      },
      data: {
        title: title,
        slug: slug,
        content: content,
        views: faker.number.int({ min: 1, max: 100 }),
        category: {
          create: {
            name: CATEGORIES[i].toLowerCase(),
          },
        },
      },
    })
  })
  // await prisma.category.createMany({
  //   data: {
  //     name: 'Tech',
  //   },
  // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
