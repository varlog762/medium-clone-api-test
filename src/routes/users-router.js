const Router = require("koa-router")
const ctrl = require("../controllers").users
const router = new Router()

const auth = require("../middleware/auth-required-middleware")

router.post("/users/login", ctrl.login)
router.post("/users", ctrl.post)

router.get("/user", auth, ctrl.get)
router.put("/user", auth, ctrl.put)

router.options('/api/user', async (ctx) => {
  ctx.status = 204;
  ctx.set('Access-Control-Allow-Origin', 'https://blog.greg-p.keenetic.pro');
  ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  ctx.set('Access-Control-Expose-Headers', 'Authorization');
  ctx.set('Access-Control-Allow-Credentials', 'true');
});

module.exports = router.routes()
