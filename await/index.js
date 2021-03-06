const fs = require("fs");
const superagent = require("superagent");

fs.readFile("./dog.txt", (err, data) => {
  console.log(`Breed ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      console.log(res.body.message);
    });
});
