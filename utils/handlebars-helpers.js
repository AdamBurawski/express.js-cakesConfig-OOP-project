const handlebarsHelpers = {
  findPrice: (entries, selectedItem) => {
    // console.log(entries, selectedItem);
    const found = entries.find((el) => el[0] === selectedItem);
    if (!found) {
      throw new Error(`Cannot find pirce of '${selectedItem}'.`);
    }
    const [, price] = found;
    return price;
  },
  pricify: (price) => price.toFixed(2),

  isNotInArray: (array, element) => !array.includes(element),

  isInArray: (array, element) => array.includes(element),
};

module.exports = {
  handlebarsHelpers,
};

// (() => {
//   const COOKIE_BASES = {
//     light: 5,
//     dark: 10,
//   };
//   const selected = "light";
//   const entries = Object.entries(COOKIE_BASES);

//   const found = entries.find((el) => el[0] === selected);
//   if (!found) {
//     throw new Error("Cannot find pirce of '${selected}'.");
//   }
//   const [, price] = found;
//   console.log(price);
// })();
