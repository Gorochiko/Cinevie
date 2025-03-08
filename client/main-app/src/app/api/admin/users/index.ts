import { NextApiRequest, NextApiResponse } from "next";

let users: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;
    const newUser = { id: Date.now().toString(), email };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  if (req.method === "GET") {
    return res.status(200).json(users);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}