// @ts-ignore
let size;

try {
    switch(process.env.SIZE) {
        case "default":
            size = {
                width: 1920,
                height: 1080
            };
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