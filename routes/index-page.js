const fs = require("fs");
const { promisify } = require('util');
const showdown = require("showdown");
const converter = new showdown.Converter();



const indexPage = async (req, res, next) => {
    
    const readFile = promisify(fs.readFile)
    const content = await readFile("./README.md",'utf-8');
    const htmlContent = converter.makeHtml(content);
    res.writeHead(200, {'content-type':'text/html'});
    res.end(htmlContent);
}

module.exports = indexPage;
