// @ts-ignore
let size;

try {
    switch(process.env.SIZE) {
        case "ipad10":
            size = {
                width: 1180,
                height: 820
            }
            break;
        default:
            break;
    }
} catch (e) {
    console.log(`You may have provided an invalid size environment variable. Please provide default for testing purposes`);
}

module.exports = {
    size
}