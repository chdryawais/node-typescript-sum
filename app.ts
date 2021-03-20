import express from 'express'
import cors from 'cors'

// Our Express APP config
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
app.use(express.static("public"));

app.set("port", process.env.PORT || 5000);


app.post('/sum', async (req: express.Request, res: express.Response) => {
    let body = req.body;
    if (body && body.number1 && body.number2) {
        // next();
        if (isNaN(body.number1)) {
            res.status(400).send({ error: `Field number1  must have a number value` });
        } else if (isNaN(body.number2)) {
            res.status(400).send({ error: `Field number2 must have a number value` });

        } else {
            let sum = parseInt(body.number1) + parseInt(body.number2);
            res.status(200).send({ data: sum });
        }
    } else {
        res.status(400).send({ error: `Missing fields number1 or number2` });
    }
})


app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port")
    );
});



