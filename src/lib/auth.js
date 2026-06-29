
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";

import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
// await client.connect();
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  // secret: process.env.BETTER_AUTH_SECRET,
  // baseURL: process.env.BETTER_AUTH_URL,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "Plachholder Google id add",
      clientSecret: process.env.GOOGLE_SECRET || "Plachholder Google secrect add",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "attendee",
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
    })