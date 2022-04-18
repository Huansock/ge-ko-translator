import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fetch from "node-fetch";
import path from "path";
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
dotenv.config();
const 요청키 = process.env.API_KEY;
io.on("connection", (socket) => {
  socket.on("german", async (data, 한국어집어넣기) => {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${요청키}`,
      {
        method: "POST",
        body: JSON.stringify({
          q: data,
          target: "de",
        }),
      }
    );
    const 번역 = await response.json();
    const korean = 번역["data"]["translations"][0]["translatedText"];
    한국어집어넣기(korean);
  });
});

app.use("/static", express.static("assets"));
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", (req, res) => res.render("index"));
app.get("/Howto", (req, res) => res.render("Howto"));

//robots txt
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(__dirname + "/robots.txt");
});

// sitemap
app.get("/sitemap.xml", function (req, res) {
  res.sendFile(__dirname + "/sitemap.xml");
});
httpServer.listen(port, () =>
  console.log(`Example app listening on port port!`)
);
