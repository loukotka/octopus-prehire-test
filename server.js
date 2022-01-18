const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/data', express.static('data'));
app.use(express.static(path.join('client', 'dist', 'octopus-prehire')));
app.use('*',express.static(path.join('client', 'dist', 'octopus-prehire','index.html')));


app.listen(port, () => {
    console.log(`App listening at port:${port}`)
})