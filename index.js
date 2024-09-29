const { Network, Alchemy } = require("alchemy-sdk");
const { ethers } = require("ethers");
const { age } = require("./age");
const api = process.env.API_KEY;
var money;

const settings = {
  apiKey: api,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

alchemy.ws.on("block", async (blocknumber) => {
  const block = await alchemy.core.getBlockWithTransactions(blocknumber);
  block.transactions.forEach((tx) => {
    // console.log(`  From: ${tx.from}`);
    // console.log(`  To: ${tx.to || "Contract Creation"}`);
    console.log(`  Value: ${ethers.formatEther(tx.value.toString())} ETH`);
    // console.log(
    //   `  Gas Price: ${ethers.formatUnits(tx.gasPrice.toString(), "gwei")} Gwei`
    // );
    // console.log(`  Gas Used: ${tx.gasLimit.toString()}`);
    // console.log(`  Transaction Hash: ${tx.hash}`);
    // console.log(`  Nonce: ${tx.nonce}`);
    // console.log("-----------------------------------");
    money = ethers.formatEther(tx.value.toString());
    if (money >= 10) {
      console.log("illicit act found value is more than 10")
    } 
    else if (money < 0.01) {
      console.log("dust transaction found")
      address_checker(tx.from, tx.to)
    }
  });
});

async function address_checker(from, to) {
  const data = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: from,
  category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });
  const txCount = {}
  data.transfers.forEach(transfers => {
    const sender = transfers.from;
    const reciever = transfers.to;

    if (sender === from && reciever === to) {
      const key = `${sender}-${reciever}`;
      txCount[key] = (txCount[key] || 0) + 1;
      
      if (txCount[key] > 1) {
        console.log(
          "Danger: Multiple transfers detected from",
          sender,
          "to",
          reciever
        );
      }
    }
    age(data);
  })
  console.log(txCount);
}

module.exports = {
  address_checker,
  alchemy,
}
