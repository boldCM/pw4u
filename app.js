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
  client.close();
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
