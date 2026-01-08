import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
