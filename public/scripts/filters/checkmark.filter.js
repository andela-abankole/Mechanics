app.filter('checkmark', [function() {
  return function(input) {
    return input ? 'Available for Hire' : 'Not Available for Hire'
  };
}])