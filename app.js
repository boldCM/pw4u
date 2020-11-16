const { readCommandLineArguments } = require("./lib/commandLine");
const {
  getPassword,
  setPassword,
  updatePassword,
  deleteItem,
  checkForPassword,
} = require("./lib/passwords");
const {
  askForMasterPassword,
  askForUpdatePassword,
  askForDelete,
  askForNewItem,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const { connect, close } = require("./lib/database");
const dotenv = require("dotenv");

dotenv.config();

async function run() {
  try {
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

    if (!(await checkForPassword(passwordName))) {
      console.log("Password/Item is not existing, choose Set to add it");
      const newItemValue = await askForNewItem();
      if (newItemValue.includes("yes")) {
        await setPassword(passwordName, newPasswordValue);
        console.log(`Password ${passwordName} set 🎉`);
      }
    }

    if (passwordName) {
      const passwordValue = await getPassword(passwordName);
      console.log(`Your password is ${passwordValue} 🎉`);

      const updatePasswordValue = await askForUpdatePassword();
      if (updatePasswordValue.includes("yes")) {
        await updatePassword(passwordName, newPasswordValue);
        console.log("Your password is updated");
      }
    }

    const deleteFullItem = await askForDelete();
    if (deleteFullItem.includes("yes")) {
      await deleteItem(passwordName);
      console.log("Your password and its name are deleted");
    }
  } catch (error) {
    if (error.message.match("E11000")) {
      console.error("DUPLICATE KEY JO!");
    } else {
      console.error(error);
    }
  } finally {
    await close();
  }
}

run();
