module.exports = function createLbUser(user){
  if (!(user in leaderboard)){
    leaderboard[user] = {
      coins: 0
    }
  }
}