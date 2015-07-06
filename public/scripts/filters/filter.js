app.filter('checkmark', [function() {
  console.log("hit filter")
  return function(input) {
    return input ? 'Available for Hire' : 'Not Available for Hire'
  };
}])