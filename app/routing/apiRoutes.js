const apiRoutes = require('express').Router();
const friends = require('../data/friends');


apiRoutes.get('/api/friends', function(req, res) {
  res.json(friends)
});

apiRoutes.post('/api/friends', function(req, res) {
  let userTotalScore = req.body.scores.reduce(getSum); // variable holding sum of user scores
  // function taking usersore as arguement that will generate match
  res.json(friends[generateMatch(userTotalScore)])
  // res.json(friends[generateMatch(userTotalScore)]);
});

function generateMatch(userTotalScore) {
  let friendsTotalScore = [];
  // populates an array with total sums of friend scores
  for (i=0; i<friends.length; i++) {
    friendsTotalScore.push(friends[i].scores.reduce(getSum));
  }
  let totalDifferences = [];

  for (x=0; x<friendsTotalScore.length; x++) {
    totalDifferences.push(Math.abs(friendsTotalScore[x] - userTotalScore));
  }

  let index = totalDifferences.indexOf(Math.min.apply(null, totalDifferences)) // returns the index of the smallest number in the array

  console.log(`userTotalScore: ${userTotalScore}`);
  console.log(`friends total score: ${friendsTotalScore}`);
  console.log(`total difference: ${totalDifferences}`);
  console.log(`index: ${index}`)

  return index;

}

function getSum(total, num) {
  return total + num;
}

module.exports = apiRoutes;
