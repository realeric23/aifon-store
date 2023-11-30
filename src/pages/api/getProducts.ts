import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";
import { groq } from "next-sanity";

type Data = {
  products?: Product[];
  error?: string;
};

const query = groq`*[_type == "product"] {
  _id,
  ...
} | order(_createdAt asc)`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const products = await sanityClient.fetch(query);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
