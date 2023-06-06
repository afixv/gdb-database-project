const express       = require('express')
const app           = express()
const cors          = require('cors')
const bodyParser 	= require("body-parser");
const helmet 		= require("helmet");
const morgan 		= require('morgan');
const port          = 3001
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
	origin: ["http://localhost:3000",  process.env.CLIENT_URL],
	methods: "GET,POST,PUT,DELETE",
	credentials: true
}));
const BookRouter = require('./src/routers/book.router');
const StaffRouter = require('./src/routers/staff.router');

app.use('/books', BookRouter);
app.use('/staffs', BookRouter);


app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})


app.use((req, res, next) => {
	const error = new Error("Not found!");
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: true,
		message: error.message
	});
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})