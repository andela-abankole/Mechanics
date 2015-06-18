app.factory('MechanicService', ['$http', function($http){
  return {
    // All Mechanic
    get : function() {
      return $http.get('/api/mechanics');
    },
    
    // By ID
    getById : function(id) {
      return $http.get('/api/mechanics/' + id);
    },
    updateById : function(id) {
      return $http.put('/api/mechanics/' + id);
    },
    deleteById : function(id) {
      return $http.delete('/api/mechanics/' + id);
    },
  };
}])