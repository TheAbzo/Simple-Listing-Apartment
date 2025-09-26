import prisma from '../src/prismaClient';
import { faker } from '@faker-js/faker';

async function main() {
  console.log('Cleaning tables...');
  await prisma.apartment.deleteMany();
  await prisma.project.deleteMany();

  const projectNames = [
    'SeaView Towers',
    'City Center Residences',
    'Green Heights',
    'River Side Complex',
    'Sunset Villas',
  ];

  console.log('Creating projects...');
  const projects = [];
  for (const name of projectNames) {
    const p = await prisma.project.create({
      data: {
        name,
        location: faker.location.city(),
      },
    });
    projects.push(p);
  }

  const TOTAL = 300;

  console.log(`Creating ${TOTAL} apartments in batches...`);
  const BATCH = 50;

  for (let i = 0; i < TOTAL; i += BATCH) {
    const batchPromises = [];
    const chunkSize = Math.min(BATCH, TOTAL - i);

    for (let j = 0; j < chunkSize; j++) {
      const proj = projects[Math.floor(Math.random() * projects.length)];

      const aptData = {
        unitName: faker.word.words({ count: 2 }),
        unitNumber: faker.helpers.replaceSymbols('##-##'),
        projectId: proj.id,
        price: parseFloat(faker.commerce.price({ min: 40000, max: 500000 })),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        area: faker.number.int({ min: 40, max: 300 }),
        description: faker.lorem.paragraph(),
        images: [faker.image.url(), faker.image.url()],
      };

      batchPromises.push(prisma.apartment.create({ data: aptData }));
    }

    await Promise.all(batchPromises);
    console.log(`Created ${Math.min(i + BATCH, TOTAL)} / ${TOTAL}`);
  }

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
