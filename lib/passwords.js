// const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { readMasterPassword } = require("./masterPassword");
const { collection } = require("./database");

async function checkForPassword(passwordName) {
  const onePassword = await collection("passwords").findOne({
    name: passwordName,
  });
  console.log(onePassword);
  if (onePassword) {
    return true;
  } else {
    return false;
  }
}

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

async function updatePassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  await collection("passwords").updateOne(
    { name: passwordName },
    { $set: { value: encryptedValue } }
    // bei Leon noch drin:
    // {
    //   upsert: true
    // }
  );
}

async function deleteItem(passwordName) {
  const item = await collection("passwords").deleteOne({
    name: passwordName,
  });
}

exports.checkForPassword = checkForPassword;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.updatePassword = updatePassword;
exports.deleteItem = deleteItem;
