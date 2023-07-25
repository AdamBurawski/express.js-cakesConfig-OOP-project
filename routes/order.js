const express = require("express");

class OrderRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/summary", this.summary);
    this.router.get("/thanks", this.thanks);
  }

  summary = (req, res) => {
    const { sum, addons, cookieBase, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render("order/summary", {
      cookie: {
        base: cookieBase,
        addons: addons,
      },
      bases: allBases,
      addons: allAddons,
      sum,
    });
  };

  thanks = (req, res) => {
    const { sum } = this.cmapp.getCookieSettings(req);

    res
      .clearCookie("cookieBase")
      .clearCookie("cookieAddons")
      .render("order/thanks", {
        sum,
      });
  };
}

module.exports = {
  OrderRouter,
};
