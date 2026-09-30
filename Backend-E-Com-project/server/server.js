import app from "./src/app/app.js";
import config from "./src/config/config.js";
import connectDb from "./src/config/db.js";

const port = config.PORT || 3000;

await connectDb();

app.listen(port, () => {
  console.log("Backend running successfully🎉");
});
