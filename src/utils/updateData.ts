import { parse } from "csv-parse";
import fetch from "node-fetch";
import prisma from "./prisma";

const continentsStrings = ["AN", "AS", "AF", "EU", "NA", "OC", "SA"];

async function createContinents() {
  const continents = await prisma.continent.createMany({
    data: continentsStrings.map((continent) => ({ code: continent })),
  });
  console.log("Created continents:");
  console.log(continents);
}

async function updateCountries() {
  const countries = await fetch(
    "https://davidmegginson.github.io/ourairports-data/countries.csv",
  );
  const data = await countries.text();

  parse(
    data,
    {
      columns: true,
    },
    async function (error, records) {
      for (const country of records) {
        const entry = await prisma.country.upsert({
          where: { id: parseInt(country.id, 10) },
          create: {
            id: parseInt(country.id, 10),
            code: country.code,
            name: country.name,
            continent: {
              connect: {
                code: country.continent,
              },
            },
            wikipediaLink: country.wikipedia_link,
            keywords: country.keywords,
          },
          update: {
            code: country.code,
            name: country.name,
            continent: {
              connect: {
                code: country.continent,
              },
            },
            wikipediaLink: country.wikipedia_link,
            keywords: country.keywords,
          },
        });
      }
      error && console.log(error);
    },
  );
}

async function updateRegions() {
  const regions = await fetch(
    "https://davidmegginson.github.io/ourairports-data/regions.csv",
  );
  const data = await regions.text();

  parse(
    data,
    {
      columns: true,
    },
    async function (error, records) {
      for (const region of records) {
        await prisma.region.upsert({
          where: { id: parseInt(region.id, 10) },
          create: {
            id: parseInt(region.id, 10),
            code: region.code,
            localCode: region.local_code,
            name: region.name,
            continent: {
              connect: {
                code: region.continent,
              },
            },
            country: { connect: { code: region.iso_country } },
            wikipediaLink: region.wikipedia_link,
            keywords: region.keywords,
          },
          update: {
            code: region.code,
            localCode: region.local_code,
            name: region.name,
            continent: {
              connect: {
                code: region.continent,
              },
            },
            country: { connect: { code: region.iso_country } },
            wikipediaLink: region.wikipedia_link,
            keywords: region.keywords,
          },
        });
      }
      error && console.log(error);
    },
  );
}

async function updateAirports() {
  const airports = await fetch(
    "https://davidmegginson.github.io/ourairports-data/airports.csv",
  );
  const data = await airports.text();

  parse(
    data,
    {
      columns: true,
    },
    async function (error, records) {
      for (const airport of records) {
        await prisma.airport.upsert({
          where: { id: parseInt(airport.id, 10) },
          create: {
            id: parseInt(airport.id, 10),
            ident: airport.ident,
            type: {
              connectOrCreate: {
                where: { type: airport.type },
                create: { type: airport.type },
              },
            },
            name: airport.name,
            latitudeDeg: parseFloat(airport.latitude_deg),
            longitudeDeg: parseFloat(airport.longitude_deg),
            elevationFt: parseInt(airport.elevation_ft || 0, 10),
            continent: {
              connect: {
                code: airport.continent,
              },
            },
            country: { connect: { code: airport.iso_country } },
            region: { connect: { code: airport.iso_region } },
            municipality: airport.municipality,
            scheduledService:
              airport.scheduled_service === "yes" ? true : false,
            homeLink: airport.home_link,
            wikipediaLink: airport.wikipedia_link,
            keywords: airport.keywords,
          },
          update: {
            ident: airport.ident,
            type: {
              connectOrCreate: {
                where: { type: airport.type },
                create: { type: airport.type },
              },
            },
            name: airport.name,
            latitudeDeg: parseFloat(airport.latitude_deg),
            longitudeDeg: parseFloat(airport.longitude_deg),
            elevationFt: parseInt(airport.elevation_ft || 0, 10),
            continent: {
              connect: {
                code: airport.continent,
              },
            },
            country: { connect: { code: airport.iso_country } },
            region: { connect: { code: airport.iso_region } },
            municipality: airport.municipality,
            scheduledService:
              airport.scheduled_service === "yes" ? true : false,
            homeLink: airport.home_link,
            wikipediaLink: airport.wikipedia_link,
            keywords: airport.keywords,
          },
        });
      }
      error && console.log(error);
    },
  );
}

async function checkContinents() {
  const continents = await prisma.continent.count();
  if (continents > 0) {
    return true;
  } else {
    return false;
  }
}

checkContinents()
  .then((continentsExist) => {
    if (!continentsExist) {
      createContinents();
    }
  })
  .then((_) => {
    updateCountries();
  })
  .then((_) => updateRegions())
  .then((_) => updateAirports());
