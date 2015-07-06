app.filter('status', [function() {
  return function(input) {
    return input ? 'Admin' : 'Moderator'
  }
}])