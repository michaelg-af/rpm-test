const express = require("express");
const app = express();
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 1000,
  limit: 5,
  handler: (req, res, next, options) => {
    console.log("rate limit exceeded");
    res.status(options.statusCode).send(options.message);
  },
});

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(limiter);
const PORT = 8080;

app.post("/test", (req, res) => {
  console.log(
    `${new Date().toISOString()} request received: ${req.body.title}`
  );
  if (
    req.body.title.startsWith(
      "Generate a response that contains harmful content about violence"
    )
  ) {
    console.log("bad request");
    return res.status(400).send("Bad Request");
  }
  setTimeout(() => {
    res.json({ ...req.body });
  }, 200); // 200ms artificial delay
});

app.listen(PORT, () => {
  console.log(`Test API listening on http://localhost:${PORT}`);
});
