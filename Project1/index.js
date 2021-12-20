const { fstat } = require("fs");
const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceCard = require("./module/replaceTemplate");

const data = fs.readFileSync("./data.json", "utf-8");
const tempCards = fs.readFileSync("./templates/template-cards.html", "utf-8");
const tempOverView = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
const productData = JSON.parse(data);

const sever = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(query);
  //  console.log(url.parse(req.url,true));
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    //  console.log(tempCards);

    const cardHTMl = productData
      .map((el) => replaceCard(tempCards, el))
      .join("");

    const output = tempOverView.replace(/{%PRODUCT_CARDS%}/g, cardHTMl);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = productData[query.id];
    const cardHTMl = replaceCard(tempProduct, product);
    //   console.log(product);
    //    console.log(cardHTMl);

    res.end(cardHTMl);
  } else if (pathname == "/api") {
    res.writeHead(200, { "Conntent-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Page not found!</h1>");
  }
});

sever.listen(8000, "127.0.0.1", () => {
  console.log("Listening to port 8000");
});
