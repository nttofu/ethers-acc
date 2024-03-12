// test.js
const CustomWallet = require("..");

const wallet = new CustomWallet();
wallet.create();

console.log("Wallet Address:", wallet.getAddress());
