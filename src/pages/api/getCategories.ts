import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";
import { groq } from "next-sanity";

type Data = {
  categories?: Category[];
  error?: string;
};

const query = groq`*[_type == "category"] {
  _id,
  ...
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const categories = await sanityClient.fetch(query);
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
