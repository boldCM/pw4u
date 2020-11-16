require("dotenv").config();

const express = require("express");
const { getPassword, deleteItem } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
const port = 3600;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});

app.post("/api/passwords", (request, response) => {
  response.send("under construction");
});

app.delete("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  await deleteItem(name);
  response.send("Name and Password deleted");
});

async function run() {
  console.log("Connecting to Database ...");
  await connect(process.env.DB_URI, process.env.DB_DBNAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`PW4U API listening at http://localhost:${port}`);
  });
}
run();
