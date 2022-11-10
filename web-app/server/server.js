/**
 * This is the starter code for the webserver.
 * You can include this file within your submission as the webserver.
 * If you are using a different module server-side, then change
 * `rpc_module` on line 24, and its import on line 10.
 * @author Leon Zhang
 * @version 2022/23
 */
import express from "express";

const port = 8080;
const app = express();

// Static serving – GET requests.
app.use("/", express.static("web-app/browser"));
app.use("/common/", express.static("web-app/common"));
app.use("/docs/", express.static("docs"));

app.listen(port, function () {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
