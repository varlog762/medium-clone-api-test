const config = require("config");
const Koa = require("koa");
const app = new Koa();

app.proxy = true;
app.keys = [config.get("secret")];

require("../schemas")(app);

const responseTime = require("koa-response-time");
const helmet = require("koa-helmet");
const logger = require("koa-logger");
const xRequestId = require("koa-x-request-id");
const camelizeMiddleware = require("../middleware/camelize-middleware");
const error = require("../middleware/error-middleware");
const cors = require("@koa/cors"); // Используем более актуальный пакет CORS
const jwt = require("../middleware/jwt-middleware");
const bodyParser = require("koa-bodyparser");
const pagerMiddleware = require("../middleware/pager-middleware");
const userMiddleware = require("../middleware/user-middleware");
const routes = require("../routes");

// Порядок middleware критически важен!
app.use(responseTime());
app.use(xRequestId({ inject: true }, app));
app.use(helmet());

// Настройки CORS должны быть одними из первых middleware
app.use(
  cors({
    origin: "https://blog.greg-p.keenetic.pro",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Authorization"],
    credentials: true,
    maxAge: 86400, // Кэшировать предварительные запросы на 24 часа
  })
);

app.use(logger());
app.use(camelizeMiddleware);
app.use(error);

// Явная обработка OPTIONS-запросов
// app.use(async (ctx, next) => {
//   if (ctx.method === "OPTIONS") {
//     ctx.status = 204;
//     ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     ctx.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
//     return;
//   }
//   await next();
// });

app.use(jwt);
app.use(
  bodyParser({
    enableTypes: ["json"],
  })
);
app.use(userMiddleware);
app.use(pagerMiddleware);

// Маршруты
app.use(routes.routes());
app.use(routes.allowedMethods({
  throw: true, // Бросать ошибки для неразрешенных методов
  notImplemented: () => new Error("Not implemented"),
  methodNotAllowed: () => new Error("Method not allowed")
}));

module.exports = app;