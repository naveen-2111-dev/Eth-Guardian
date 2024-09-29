const { Network, Alchemy } = require("alchemy-sdk");
const { ethers } = require("ethers");
const api = process.env.API_KEY;

const settings = {
  apiKey: api,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

alchemy.ws.on("block", async (blocknumber) => {
  const block = await alchemy.core.getBlockWithTransactions(blocknumber);
  block.transactions.map((tx) => {
    console.log(`  From: ${tx.from}`);
    console.log(`  To: ${tx.to || "Contract Creation"}`);
    console.log(`  Value: ${ethers.formatEther(tx.value.toString())} ETH`);
    console.log(
      `  Gas Price: ${ethers.formatUnits(tx.gasPrice.toString(), "gwei")} Gwei`
    );
    console.log(`  Gas Used: ${tx.gasLimit.toString()}`);
    console.log(`  Transaction Hash: ${tx.hash}`);
    console.log(`  Nonce: ${tx.nonce}`);
    console.log("-----------------------------------");
  });
});
