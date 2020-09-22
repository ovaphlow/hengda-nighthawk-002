const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const logger = require("../../hengda-pitchfork/dispatcher/util/bunyan");
const postgres = require("../../hengda-pitchfork/dispatcher/util/postgres");

const app = new Koa();

app.env = "production";

app.use(bodyParser());

const router = new Router({
	prefix: "/api/nighthawk-002",
});

router.get("/:id", async (ctx) => {
	const cnx = await postgres.connect();
	try {
		const sql = `
    select * from nighthawk."002" where id = $1 limit 1
    `;
		const result = await cnx.query(sql, [parseInt(ctx.params.id, 10)]);
		ctx.response.status = 200;
		ctx.response.body = !!result.rows.length ? result.rows[0] : {};
	} catch (err) {
		logger.error(`--> ${ctx.request.method} ${ctx.request.url} ${err}`);
		ctx.response.status = 500;
	}
});

router.post("/", async (ctx) => {
	const cnx = await postgres.connect();
	try {
		const sql = `
      insert into nighthawk."002" 
        (dept,staff,route,datime,json_doc) 
      values 
        ($1,$2,$3,$4,$5::jsonb)
    `;
		await cnx.query(sql, [
			ctx.request.body.dept,
      ctx.request.body.staff,
      ctx.request.body.route,
      ctx.request.body.datime,
      JSON.stringify({
        text: ctx.request.body.text
      })
		]);
		ctx.response.status = 200;
	} catch (err) {
		logger.error(`--> ${ctx.request.method} ${ctx.request.url} ${err}`);
		ctx.response.status = 500;
	}
});

router.put("/:id", async (ctx) => {
  const cnx = await postgres.connect();
  console.info(ctx.params.id)
	try {
		const sql = `
      update  
        nighthawk."002" 
      set
        dept = $1,
        staff = $2,
        route = $3,
        datime = $4,
        json_doc = $5::jsonb
      where id = $6
    `;
		await cnx.query(sql, [
			ctx.request.body.dept,
      ctx.request.body.staff,
      ctx.request.body.route,
      ctx.request.body.datime,
      JSON.stringify({
        text: ctx.request.body.text 
      }),
      parseInt(ctx.params.id, 10)
		]);
		ctx.response.status = 200;
	} catch (err) {
		logger.error(`--> ${ctx.request.method} ${ctx.request.url} ${err}`);
		ctx.response.status = 500;
	}
});

router.delete("/:id", async (ctx) => {
	const cnx = await postgres.connect();
	try {
		const sql = `
      delete from nighthawk."002" where id = $1
    `;
		await cnx.query(sql, [parseInt(ctx.params.id, 10)]);
		ctx.response.status = 200;
	} catch (err) {
		logger.error(`--> ${ctx.request.method} ${ctx.request.url} ${err}`);
		ctx.response.status = 500;
	}
});

router.put("/", async (ctx) => {
	const cnx = await postgres.connect();
	try {
		const sql = `
      select * from nighthawk."002"
    `;
		const result = await cnx.query(sql);
		ctx.response.body = !!result.rows.length ? result.rows : [];
	} catch (err) {
		logger.error(`--> ${ctx.request.method} ${ctx.request.url} ${err}`);
		ctx.response.status = 500;
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;