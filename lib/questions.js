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

exports.askForMasterPassword = askForMasterPassword;

exports.askForUpdatePassword = askForUpdatePassword;

exports.askForDelete = askForDelete;
