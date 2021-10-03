import express from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const toDoFile = join(dirname(fileURLToPath(import.meta.url)), "todo.json");

const readToDo = async () => {
  return JSON.parse(await fs.readFile(toDoFile));
};

const saveToDo = async (data) => {
  await fs.writeFile(toDoFile, JSON.stringify(data));
};

const createNewList = (name) => {
  return {
    _id: uniqid(),
    _createdAt: new Date(),
    ...name,
    tasks: [],
  };
};

const ToDoListRouter = express.Router();

ToDoListRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await readToDo());
  } catch (error) {
    console.log(error);
  }
});

ToDoListRouter.get("/:listId", async (req, res) => {
  try {
    const data = await readToDo();
    let list = data.find((list) => req.params.listId === list._id);
    res.status(200).send(list);
  } catch (error) {
    console.log(error);
  }
});

ToDoListRouter.post("/", async (req, res) => {
  try {
    const data = await readToDo();
    data.push(createNewList(req.body));
    await saveToDo(data);
    res.status(201).send(`Your list ${req.body.name} is created`);
  } catch (error) {
    console.log(error);
  }
});

export default ToDoListRouter;
