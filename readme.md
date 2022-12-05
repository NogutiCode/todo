# How to work with my Todo DB
### You must use docker (For rethinkdb)
```shell
docker compose up
```
### At rethinkdb menu. Switch to Data explorer, and paste this
```javascript
r.tableCreate('marvel');
r.table('marvel').insert(r.http('http://rethinkdb.com/sample/top-250-ratings.json'))
```
### You must download nunjucks, node.js, nodemon, express js

#### nunjucks.js
```shell
npm install nunjucks
```
#### Express.js
```shell
npm install express --save
```
#### nodemon
```shell
npm i nodemon
```
#### node.js

https://nodejs.org/en/

### If u want start server
```shell
npm run dev  

or

nodemon app.js 

or

node app.js
```