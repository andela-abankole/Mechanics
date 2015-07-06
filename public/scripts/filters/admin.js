app.filter('status', [function() {
  console.log("hit")
  return function(input) {
    return input ? 'Admin' : 'Moderator'
  }
}])