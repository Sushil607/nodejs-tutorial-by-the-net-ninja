const fs = require("fs");

// create a stream to read from the file
const readStream = fs.createReadStream("./docs/largefile.txt", {
  encoding: "utf8",
});

// create a stream to write to the file
const writeStream = fs.createWriteStream("./docs/outputfile.txt");

// first reading from docs/largefile
readStream.on("data", (chunk) => {
  console.log("*****NEW DATA CHUNK*****");
  console.log(chunk);
  // then writing to docs/outputfile
  writeStream.write("\n*****NEW DATA CHUNK*****\n");
  writeStream.write(chunk);
});

// Piping
// above function work with a single line
// from a readable stream to a writable stream
// readStream.pipe(writeStream);
