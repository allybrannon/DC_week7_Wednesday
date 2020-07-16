const http = require("http");
const fs = require("fs");
const url = require("url");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./index.html", "utf8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");

      res.end(data);
    });
  } else if (req.url === "/style.css") {
    fs.readFile("./style.css", "utf8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/css");
      res.end(data);
    });
  } else if (req.url.includes("/api")) {
    let apiData = [
      { name: "Ally", age: "38" },
      { name: "Alexis", age: "40" },
      { name: "Watson", age: "9" },
    ];
    let results = [...apiData];
    let query = url.parse(req.url, true).query;
    if (Object.keys(query).includes("name")) {
      console.log(query.name);
      results = apiData.filter(
        (l) => l.name.toLowerCase() === query.name.toLowerCase()
      );
    }
    res.statusCode == 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(apiData));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.end("The Content is not here");
  }
});

//127.0.0.1 === localhost
server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
