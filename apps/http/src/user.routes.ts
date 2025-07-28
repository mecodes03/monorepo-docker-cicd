import { Router } from "express";
import { client } from "@repo/prisma/client"; // adjust path as needed

const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("wanna create user?");
  try {
    const user = await client.user.create({ data: req.body });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (_, res) => {
  const users = await client.user.findMany({ include: { Note: true } });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await client.user.findUnique({
    where: { id },
    include: { Note: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await client.user.update({
      where: { id },
      data: req.body,
    });
    res.json(user);
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await client.user.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

export default router;
