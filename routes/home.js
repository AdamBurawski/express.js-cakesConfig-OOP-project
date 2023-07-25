const express = require("express");
// const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");
// const { handlebarsHelpers } = require("../utils/handlebars-helpers");

class HomeRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.get("/", this.home);
  }

  home = (req, res) => {
    const { sum, addons, cookieBase, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render("home/index", {
      cookie: {
        base: cookieBase,
        addons: addons,
      },
      bases: allBases,
      addons: allAddons,
      sum,
    });
  };
}
const home = new HomeRouter();

// const homeRouter = express.Router();

// homeRouter.get("/", (req, res) => {
//   const { cookieBase } = req.cookies;

//   const addons = getAddonsFromReq(req);

//   const sum =
//     (cookieBase
//       ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
//       : 0) +
//     addons.reduce(
//       (prev, curr) =>
//         prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr),
//       0
//     );

//   res.render("home/index", {
//     cookie: {
//       base: cookieBase,
//       addons: addons,
//     },
//     bases: Object.entries(COOKIE_BASES),
//     addons: Object.entries(COOKIE_ADDONS),
//     sum,
//   });
// });

module.exports = {
  HomeRouter,
};
