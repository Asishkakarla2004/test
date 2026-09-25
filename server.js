const express = require("express");
const path = require("path");
const timerRoutes = require("./routes/timerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", timerRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Nature Timer running on port ${PORT}`);
});
