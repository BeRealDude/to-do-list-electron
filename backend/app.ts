import express from "express";
import sequelize from "./src/db/db";
import Note from "./src/models/note";
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

// Синхронизация базы перед стартом сервера
sequelize.sync().then(() => console.log("База данных синхронизирована"));

// Создание заметки
app.post("/notes", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// Получение всех заметок
app.get("/notes", async (_req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

// Удаление заметки
app.delete("/notes/:id", async (req, res) => {
  await Note.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));