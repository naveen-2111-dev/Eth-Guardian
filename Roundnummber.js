async function RoundNumber(value) {
    if (Number.isInteger(parseFloat(value))) {
        console.log("its a round value"); //should be noted in database
    } else {
        console.log("not a round number")
    }
}