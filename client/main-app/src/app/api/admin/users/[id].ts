import { NextApiRequest, NextApiResponse } from "next";

let users: any[] = [
  { id: "1", email: "user1@example.com" },
  { id: "2", email: "user2@example.com" },
  { id: "3", email: "user3@example.com" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    users = users.filter((user) => user.id !== id);
    return res.status(204).end();
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
