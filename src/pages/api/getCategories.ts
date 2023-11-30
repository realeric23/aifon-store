import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";
import { groq } from "next-sanity";

type Data = {
  categories: Category[];
};

const query = groq`*[_type == "category"] {
  _id,
    ...
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  try {
    const categories = await sanityClient.fetch(query);

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
