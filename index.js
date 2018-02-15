const koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const handlebars = require('koa-handlebars');
const parseFile = require('./parse-file.js');
const app = koa();

app.use(serve('public'));

app.use(handlebars({
  defaultLayout: 'layout',
}));

router
  .get('/card', function * ggenerateCard() {
    if (!this.query.data) {
      return;
    }

    const parsedData = JSON.parse(this.query.data.replace(/\\\'/g, '\"'));

    yield this.render('card', {
      title: 'Card title',
      question: parsedData.question,
      answers: parsedData.answers,
    });
  })
  .get('/', function * parseInput() {
    yield this.render('index', {
      title: 'Card title',
    });
  })
  .post('/', function * invokeParsing() {
    yield parseFile();
  });

app.use(router.routes());
app.listen(4000);
