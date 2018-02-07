let express = require("express");
let path = require("path");
const PORT = process.env.PORT || process.env.port || 8888;

let app = express();

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT}/`);
});