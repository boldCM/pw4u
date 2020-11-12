const { readCommandLineArguments } = require("./lib/commandLine");
const { getPassword, setPassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
  "mongodb+srv://Caro:GJdA7hLcePYMLha2@cluster0.qazjp.mongodb.net/pw4u?retryWrites=true";

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  const db = client.db("pw4u");

  db.collection("passwords")
    .insertOne({
      pw: "SomePW",
      value: "4567",
    })
    .then(function (result) {
      // process result
    });

  const cursor = db.collection("passwords").find({});

  function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
  }

  function errorFunc(error) {
    console.log(error);
  }

  cursor.forEach(iterateFunc, errorFunc);

  db.collection("passwords")
    .insertMany([
      { title: "journal", pw: 25, name: "journalname" },
      { title: "facebook", pw: 50, name: "facbookName" },
      { title: "klo", pw: 100, name: "paper" },
    ])
    .then(function (result) {
      // process result
    });

  // client.close();
});

async function run() {
  const masterPassword = await askForMasterPassword();

  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error("You are not welcome here! 👿 Try again!");
    return run();
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.error("Missing password name!");
    return process.exit(9);
  }

  if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const passwordValue = await getPassword(passwordName);
    console.log(`Your password is ${passwordValue} 🎉`);
  }
}

run();
