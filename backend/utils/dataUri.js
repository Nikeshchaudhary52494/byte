// import dataUriParser from "datauri/parser"
// import path from "path";
const dataUriParser = require("datauri/parser");
const path = require("path");
const getDataUri = (file) => {
    const parser = new dataUriParser();
    const extName = path.extname(file.name).toString();
    return parser.format(extName, file.data);
}
module.exports = getDataUri;