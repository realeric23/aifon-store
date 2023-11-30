import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../sanity";
import { groq } from "next-sanity";

type Data = {
  products: Product[];
};

const query = groq`*[_type == "product"] {
  _id,
...
} | order(_createdAt asc)`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products = await sanityClient.fetch(query);
  res.status(200).json({ products });
}
