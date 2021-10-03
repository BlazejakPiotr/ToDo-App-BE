import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import ToDoListRouter from "./services/ToDoList/index.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/todo", ToDoListRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
