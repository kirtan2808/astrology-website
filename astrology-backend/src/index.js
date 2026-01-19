require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= CORS =================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Cache-Control"],
  })
);

app.use(express.json());

// ================= ROUTES =================
const mulankRoute = require("./routes/mulank");
const lifepathRoute = require("./routes/lifepath");
const destinynoRoute = require("./routes/destinyno");
const soulurgeRoute = require("./routes/soulurge");
app.use("/api", mulankRoute);
app.use("/api", lifepathRoute);
app.use("/api", destinynoRoute);
app.use("/api", soulurgeRoute);

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
