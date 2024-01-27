import express from "express"
import session from "express-session"
import cors from "cors"
import morgan from "morgan"

// set up express instance
const app = express();

// set up middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);

import handlerFunctions from "./controller.js"

app.get("/athletes", handlerFunctions.getAllAthletes);
app.post("/addAth", handlerFunctions.addAth);
app.delete("/deleteAth/:id", handlerFunctions.deleteAth);
app.put("/updateAth/:id", handlerFunctions.updateAth)

app.listen(9001, () => console.log("My homies let's meet at http://localhost:9001"));