var db = require("./models");

// db.favorite.create({
//   imdbId: "tt0076759",
//   title: "Star Wars",
//   year: "1989"
// });

db.tag.create({tag:"action"}).then(function(tag){
  console.log(tag.get());
});

