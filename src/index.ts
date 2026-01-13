import path from "path";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Running on ${port}`);
    });
}

export default app;
