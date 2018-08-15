import * as errorHandler from "errorhandler";
import { config } from "dotenv";
import { app } from "./app";


const result = config();
console.log(result);
console.log(result.parsed);
console.log(process.env.PORT);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        process.env.PORT,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;