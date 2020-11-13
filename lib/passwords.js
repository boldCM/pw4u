const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { readMasterPassword } = require("./masterPassword");
const { collection } = require("./database");

async function getPassword(passwordName) {
  const onePassword = await collection("passwords").findOne({
    name: passwordName,
  });

  const passwordBytes = CryptoJS.AES.decrypt(
    onePassword.value,
    await readMasterPassword()
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
