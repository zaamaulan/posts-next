import { CATEGORIES } from "@/lib/constants"
import { prisma } from "@/lib/prisma"
import { fakerID_ID as faker } from "@faker-js/faker"

const main = async () => {
  await prisma.post.deleteMany()

  Array.from({ length: 20 }).forEach(async () => {
    const paragraph = faker.lorem.paragraphs(7)
    const content = paragraph
      .split("\n")
      .map((p) => `<p>${p}</p>`)
      .join("")
    const title = faker.lorem.sentence({ min: 6, max: 9 }).replace(/\.$/, "")
    const date = faker.date.recent()
    const slug = title.replace(/ /g, "-").toLowerCase() + `-${date.getTime()}`

    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        category: faker.helpers.arrayElement(CATEGORIES),
        views: faker.number.int({ min: 1, max: 100 }),
      },
    })
  })
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
