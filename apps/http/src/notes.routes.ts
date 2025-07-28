import { Router } from "express";
import { client } from "@repo/prisma/client";

const router: Router = Router();

// Create note
router.post("/", async (req, res) => {
  try {
    const note = await client.note.create({ data: req.body });
    res.status(201).json(note);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Read all notes
router.get("/", async (_, res) => {
  const notes = await client.note.findMany({ include: { user: true } });
  res.json(notes);
});

// Read one note
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const note = await client.note.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// Update note
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const note = await client.note.update({
      where: { id },
      data: req.body,
    });
    res.json(note);
  } catch {
    res.status(404).json({ error: "Note not found" });
  }
});

// Delete note
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await client.note.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Note not found" });
  }
});

export default router;
