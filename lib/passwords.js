const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { readMasterPassword } = require("./masterPassword");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(passwordName) {
  const passwordSafe = await readPasswordSafe();

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordSafe[passwordName],
    await readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const passwordSafe = await readPasswordSafe();
  passwordSafe[passwordName] = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  await writePasswordSafe(passwordSafe);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;