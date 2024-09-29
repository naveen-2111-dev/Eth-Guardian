async function age(data) {
    if (data.transfers.length == 0) {
        console.log("no transfers found its a new address")
        return;
    }
    const firstTransfer = data.transfers[0];
    const blockNumber = firstTransfer.blockNum;
    const block = await alchemy.core.getBlock(blockNumber);
    const firstTransactionTimestamp = block.timestamp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const ageInSeconds = currentTimestamp - firstTransactionTimestamp;
    const ageInDays = ageInSeconds / (60 * 60 * 24);

    console.log(
      `Address ${address} is approximately ${ageInDays.toFixed(2)} days old.`
    );
}

module.exports = {
    age
}