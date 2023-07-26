const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const { HomeRouter } = require("./routes/home");
const { handlebarsHelpers } = require("./utils/handlebars-helpers");
const { ConfiguratorRouter } = require("./routes/configurator");
const { OrderRouter } = require("./routes/order");
const { COOKIE_ADDONS, COOKIE_BASES } = require("./data/cookies-data");

class CookieMakerApp {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._loadData();
    // eslint-disable-next-line no-underscore-dangle
    this._configureApp();
    // eslint-disable-next-line no-underscore-dangle
    this._setRoutes();
    // eslint-disable-next-line no-underscore-dangle
    this._run();
  }

  _configureApp() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(cookieParser());

    this.app.engine(
      ".hbs",
      hbs.engine({ extname: ".hbs", helpers: handlebarsHelpers })
    );
    this.app.set("view engine", ".hbs");
  }

  _setRoutes() {
    this.app.use("/", new HomeRouter(this).router);
    this.app.use("/configurator", new ConfiguratorRouter(this).router);
    this.app.use("/order", new OrderRouter(this).router);
  }

  // eslint-disable-next-line no-underscore-dangle
  _run() {
    this.app.listen(3000, "localhost", () => {
      console.log("Listening on http://localhost:3000");
    });
  }

  showErrorPage(res, desc) {
    res.render("error", {
      description: desc,
    });
  }

  getAddonsFromReq(req) {
    const { cookieAddons } = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }

  getCookieSettings(req) {
    const { cookieBase } = req.cookies;

    const addons = this.getAddonsFromReq(req);

    const allBases = Object.entries(this.data.COOKIE_BASES);
    const allAddons = Object.entries(this.data.COOKIE_ADDONS);

    const sum =
      (cookieBase ? handlebarsHelpers.findPrice(allBases, cookieBase) : 0) +
      addons.reduce(
        (prev, curr) => prev + handlebarsHelpers.findPrice(allAddons, curr),
        0
      );
    return {
      // Selected items
      addons,
      cookieBase,
      // Calculations
      sum,
      //All posibilities
      allBases,
      allAddons,
    };
  }

  // eslint-disable-next-line no-underscore-dangle
  _loadData() {
    this.data = {
      COOKIE_BASES,
      COOKIE_ADDONS,
    };
  }
}

new CookieMakerApp();

// ReplIt
// app.listen(3000, "0.0.0.0")
