const express = require('express');

const port = 3000;
const app = express();
const path = require('path');

const filePath404Page = path.resolve(__dirname, '../client/404.html');

// import routes
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const apiRouter = require('./routes/api.js');
const complainRouter = require('./routes/complain.js');

// use routes (put this near the bottom, BEFORE app.listen()
app.use('/', indexRouter);
app.use(express.static('client'));

// // .all refers to ALL http methods - GET, POST, DELETE etc
// // note .status(404) and method chaining
// // .status(404) is how we send the 404 - File Not Found status code
// app.all('*', (req, res) => {
//   res.status(404).sendFile(filePath404Page);
// });

// app.use((req, res, next) => {res.status(404).sendFile(filePath404Page);})

app.use('/quotes', quotesRouter);// now /quotes is a route!
app.use('/api', apiRouter);
app.use('/complain', complainRouter);

app.use((req, res) => {
  res.status(404).sendFile(filePath404Page);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

// TO DELETE
// app.post('/addComment', function(req, res){
//     res.send("You just called the post method at '/addComment'!\n");
//  });
