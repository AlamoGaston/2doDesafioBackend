const Router = require("koa-router");

const {
  homeController,
  signupController,
  bienvenidaController,
  viewFormAddProductController,
  viewErrorController,
} = require("../../controller/generalViewsCotroller");

//My middleware
const isLogged = (req, res, next) => {
  let msgError = "Para acceder a esta URL debe iniciar sesión";
  if (req.user) {
    next();
  } else {
    return res.render("viewError", { msgError });
  }
};

const router = new Router({
  prefix: "/",
});

router.get("/", homeController);
router.get("/signup", signupController);
router.get("/bienvenida", isLogged, bienvenidaController);
router.get("/formAddProduct", isLogged, viewFormAddProductController);
router.get("/error/:msg", viewErrorController);

module.exports = router;
