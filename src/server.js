const express = require('express');

const port = 3000;
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.get('/api/', (req, res) => { res.sendFile(path.join(__dirname, 'api', 'index.html')); });

app.get('/api/ps-:script', (req, res) => {

    const userAgent = req.get('User-Agent');
    if (!userAgent.includes('PowerShell')) { return res.status(400).send('<h1>Access denied. <h1>'); }

    const scriptName = req.params.script;
    const queryParams = req.query;
    const filePath = path.join(__dirname, '..', 'powershell', scriptName);

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) { return res.status(404).send('File not found'); }

        // Add params if any
        let paramDefinitions = '';
        for (const [key, value] of Object.entries(queryParams)) {
            paramDefinitions += `$${key} = "${value}"\n`;
        }

        // return script with params as plain text
        const scriptWithParams = paramDefinitions + data;
        res.type('text/plain').send(scriptWithParams);

    });

});

app.listen(port, () => { console.log(`Running on http://localhost:${port}`); });
