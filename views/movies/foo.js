var algorithmia = require('algorithmia');

var client = algorithmia("simMy/N9KJorqt9DUDZAzFh4gp51");
var input = "This works!"

client.algo("nlp/SentimentAnalysis").pipe(input).then(function(output){
  console.log(output.result)
})