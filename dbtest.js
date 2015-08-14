var db = require("./models");

// db.favorite.create({
//   imdbId: "tt0076759",
//   title: "Star Wars",
//   year: "1989"
// });

db.tag.findOrCreate({where:{tag:"action"}}).spreadfunction(tag, created){
  db.favorite.findById(1).then(function(favorite) {
    favorite.addTag(tag.then.(function()))
  })
  console.log(tag.get());
});

