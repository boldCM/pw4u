const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "input",
      name: "masterPassword",
      message: "What is the super secret master password?",
    },
  ]);
  return masterPassword;
}

async function askForUpdatePassword() {
  const { updatePasswordValue } = await inquirer.prompt([
    {
      type: "list",
      choices: ["yes", "no"],
      name: "updatePasswordValue",
      message: "Do you want to change your Password?",
    },
  ]);
  return updatePasswordValue;
}

async function askForDelete() {
  const { deleteItem } = await inquirer.prompt([
    {
      type: "list",
      choices: ["yes", "no"],
      name: "deleteItem",
      message: "Do you want to delete a Password with inlcuding its name?",
    },
  ]);
  return deleteItem;
}

async function askForNewItem() {
  const { newItem } = await inquirer.prompt([
    {
      type: "list",
      choices: ["yes", "no"],
      name: "newItem",
      message: "Do you want to set a new Password and its name?",
    },
  ]);
  return newItem;
}

exports.askForMasterPassword = askForMasterPassword;
exports.askForUpdatePassword = askForUpdatePassword;
exports.askForDelete = askForDelete;
exports.askForNewItem = askForNewItem;
