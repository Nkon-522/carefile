import app from "./app.js";
import { serverClose } from "./utils/serverClose.helpers.js"

let server = app.listen(3000, function() {
    console.log("Server is listening on port", 3000);    
});

process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    serverClose(server);
});

process.on("SIGINT", () => {
    console.info("SIGINT signal received.");
    console.log("Closing http server.");
    serverClose(server);
});
