const apiRoutes = require('express').Router();
const friends = require('../data/friends');


apiRoutes.get('/api/friends', function(req, res) {
  res.json(friends)
});

apiRoutes.post('/api/friends', function(req, res) {
  let userTotalScore = req.body.scores.reduce(getSum); // sum of user inputted scores
  res.json(friends[generateMatch(userTotalScore)])   // function taking userscore as arguement that will return index of closest match
  friends.push(req.body);
});

function generateMatch(userTotalScore) {
  let friendsTotalScore = [];
  // populates an array with total sums of friend scores
  for (i=0; i<friends.length; i++) {
    friendsTotalScore.push(friends[i].scores.reduce(getSum));
  }
  // populates an array of total differences between user total and friend totals
  let totalDifferences = [];
  for (x=0; x<friendsTotalScore.length; x++) {
    totalDifferences.push(Math.abs(friendsTotalScore[x] - userTotalScore));
  }

  // sets variable index to the index of the smallest number in the array
  let index = totalDifferences.indexOf(Math.min.apply(null, totalDifferences))

  //console.log tests
  console.log(`userTotalScore: ${userTotalScore}`);
  console.log(`friends total score: ${friendsTotalScore}`);
  console.log(`total difference: ${totalDifferences}`);
  console.log(`index: ${index}`)

  return index;
}

//reduce function for total sum of arrays
function getSum(total, num) {
  return total + num;
}

module.exports = apiRoutes;
