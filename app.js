const { Console } = require('console');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const nunjucks = require('nunjucks');
app.use(express.urlencoded());

//NUNJUCKS
app.set('views', './views')
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
//CONNECT TO DB
var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost'
});

//MAIN VIEW
app.get('/', function(req, res) {
	r.table('marvel').run(function(err, result) {
		if (err) throw err;
		res.render('index.njk', {result})
	});
});
//EDIT METHOD 
app.get('/editings', function(req, res) {
	const editing = (req.query.id);
	console.log((editing))
	r.table('marvel').get(editing).run(function(err, result1){
		if (err) throw err;
		console.log(JSON.stringify(result1))
		res.render('edit.njk', {result1})
	});
});
app.post('/edit', function(req, res) {

	const rank = (req.body.Rank);
	const rating = (req.body.Rating);
	const title = (req.body.Title);
	const votes = (req.body.Votes);
	const year = (req.body.Year);
	const idEdita = (req.body.finalEditId);

	r.table("marvel").get(idEdita).update({
		rank: rank,
		rating: rating,
		title: title,
		votes: votes,
		year: year
	}).run(function(err){
		res.redirect('/');
	});
});

// ADD METHOD
app.get('/add', function(req, res) {
	res.render('add.njk')
});
app.post('/save', function(req, res) {

	const rank = (req.body.Rank);
	const rating = (req.body.Rating);
	const title = (req.body.Title);
	const votes = (req.body.Votes);
	const year = (req.body.Year);

	r.table("marvel").insert({
		rank: rank,
		rating: rating,
		title: title,
		votes: votes,
		year: year
	}).run(function(err){
		res.redirect('/');
	});
});

//DELETE METHOD
app.post('/delete', function(req, res) {
	const id = req.body.deleteId;
	r.table("marvel").get(id).delete().run(function(err){
		res.redirect('/');
	});
});

//FOR CONSOLE
app.listen(port);
console.log('Server started at http://localhost:' + port);