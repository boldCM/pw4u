const { readCommandLineArguments } = require("./lib/commandLine");
const { getPassword, setPassword, updatePassword } = require("./lib/passwords");
const {
  askForMasterPassword,
  askForUpdatePassword,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const { connect, close } = require("./lib/database");
const dotenv = require("dotenv");

dotenv.config();

async function run() {
  console.log("Connecting to database...");
  await connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qazjp.mongodb.net/pw4u?retryWrites=true`,
    "pw4u"
  );
  console.log("Connected to database 🎉");

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

  const updatePasswordValue = await askForUpdatePassword();

  if (updatePasswordValue.includes("yes")) {
    await updatePassword(passwordName, newPasswordValue);
    console.log("Your password is updated");
  }
  await close();
}

run();
