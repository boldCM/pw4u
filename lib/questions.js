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

exports.askForMasterPassword = askForMasterPassword;

exports.askForUpdatePassword = askForUpdatePassword;
