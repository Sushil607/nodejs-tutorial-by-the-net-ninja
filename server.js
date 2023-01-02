// HTTP Core Node Module
const http = require("http");
const fs = require("fs");
// locally installed
const _ = require("lodash");

// callback is gonna run every time a request comes to server
const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(`Random Number : ${num}`);

  const greet = _.once(() => {
    console.log("hello");
  });

  greet();
  greet();
  greet();

  // request object
  // console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // routing
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }

  // response object
  // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      // ending the response which then sends it to the browser
      res.end();
    }
  });
});

const PORT_NUMBER = 3000;
const HOST_NAME = "localhost";
server.listen(PORT_NUMBER, HOST_NAME, () => {
  console.log(`Server is listening for request on ${PORT_NUMBER}...`);
});
