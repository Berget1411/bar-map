import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config({ path: "../../apps/server/.env" });

import * as schema from "./schema";
import { bar } from "./schema/bar";

const stockholmBars = [
  {
    name: "Berns Asiatiska",
    address: "Berzelii Park, 111 47 Stockholm",
    latitude: 59.3327,
    longitude: 18.0727,
    description: "Iconic venue in Berzelii Park with Asian-inspired menu and cocktails.",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop",
    rating: 4.4,
    hours: "5:00 PM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Östermalm Saluhall Bar",
    address: "Östermalmstorg 14, 114 42 Stockholm",
    latitude: 59.3359,
    longitude: 18.0781,
    description: "Elegant bar inside the historic Östermalm food hall.",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&h=200&fit=crop",
    rating: 4.3,
    hours: "9:00 AM – 7:00 PM",
    isOpen: true,
  },
  {
    name: "Pharmarium",
    address: "Stortorget 7, 111 29 Stockholm",
    latitude: 59.3252,
    longitude: 18.0712,
    description: "Apothecary-themed cocktail bar in the heart of Gamla Stan.",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=200&fit=crop",
    rating: 4.6,
    hours: "4:00 PM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Gondolen",
    address: "Stadsgårdsleden 152, 116 45 Stockholm",
    latitude: 59.3196,
    longitude: 18.0745,
    description: "Sky-high bar atop Katarinahissen with sweeping Stockholm views.",
    imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&h=200&fit=crop",
    rating: 4.5,
    hours: "11:30 AM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Riche",
    address: "Birger Jarlsgatan 4, 114 34 Stockholm",
    latitude: 59.3349,
    longitude: 18.0718,
    description: "Classic Stockholm brasserie and bar since 1893.",
    imageUrl: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=300&h=200&fit=crop",
    rating: 4.2,
    hours: "11:30 AM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Linje 10",
    address: "Götgatan 40, 118 26 Stockholm",
    latitude: 59.3148,
    longitude: 18.0718,
    description: "Laid-back Södermalm bar with craft beers and a rooftop terrace.",
    imageUrl: "https://images.unsplash.com/photo-1575367439058-6096bb522a0f?w=300&h=200&fit=crop",
    rating: 4.1,
    hours: "3:00 PM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Snotty Sounds Bar",
    address: "Skånegatan 90, 116 35 Stockholm",
    latitude: 59.3129,
    longitude: 18.0787,
    description: "Indie rock dive bar on Södermalm with live music and cheap drinks.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop",
    rating: 4.0,
    hours: "5:00 PM – 3:00 AM",
    isOpen: true,
  },
  {
    name: "ICEBAR Stockholm",
    address: "Vasaplan 4, 111 20 Stockholm",
    latitude: 59.3318,
    longitude: 18.0545,
    description: "World-famous bar entirely made of ice from the Torne River.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
    rating: 4.3,
    hours: "11:15 AM – 10:00 PM",
    isOpen: true,
  },
  {
    name: "Trädgården",
    address: "Hammarby Slussväg 2, 118 60 Stockholm",
    latitude: 59.3175,
    longitude: 18.0748,
    description: "Massive outdoor club and bar under Skanstull bridge, open summers.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop",
    rating: 4.4,
    hours: "Seasonal – closed",
    isOpen: false,
  },
  {
    name: "The Flying Elk",
    address: "Mäster Samuelsgatan 15, 111 44 Stockholm",
    latitude: 59.3334,
    longitude: 18.0667,
    description: "Björn Frantzén's gastropub with exceptional cocktails.",
    imageUrl: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=300&h=200&fit=crop",
    rating: 4.7,
    hours: "5:00 PM – 12:00 AM",
    isOpen: true,
  },
  {
    name: "Omnipollos Hatt",
    address: "Hökens gata 1A, 116 46 Stockholm",
    latitude: 59.3192,
    longitude: 18.0737,
    description: "Craft beer haven on Södermalm with rotating taps and great pizza.",
    imageUrl: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=300&h=200&fit=crop",
    rating: 4.5,
    hours: "3:00 PM – 1:00 AM",
    isOpen: true,
  },
  {
    name: "Café Opera",
    address: "Karl XII:s torg, 111 86 Stockholm",
    latitude: 59.3314,
    longitude: 18.0712,
    description: "Legendary nightclub and bar in the historic Opera building.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop",
    rating: 4.2,
    hours: "11:30 PM – 5:00 AM",
    isOpen: true,
  },
];

async function seed() {
  const sql = neon(process.env.DATABASE_URL ?? "");
  const db = drizzle(sql, { schema });

  console.log("Seeding Stockholm bars...");
  await db.insert(bar).values(stockholmBars).onConflictDoNothing();
  console.log(`Inserted ${stockholmBars.length} bars.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
