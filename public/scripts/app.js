var app = angular.module('Mechanic', ['ui.router', 'ngCookies', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/landing.html"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "partials/login.html"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "partials/signup.html"
    })
    .state('dashboard', {
      url: "/dashboard",
      views: {
        '' : {
          templateUrl: 'partials/nav.dashboard.html'
        },
        'theView@dashboard': {
          templateUrl: "partials/dashboard.html" 
        }
      }
    })
    .state('addmechanic', {
      url: "/addmechanic",
      views: {
        '' : {
          templateUrl: 'partials/nav.addmechanics.html'
        },
        'theView@addmechanic' : {
          templateUrl: "partials/addmechanic.html"
        }
      },
    })
    .state('mechanics', {
      url: "/mechanics",
      views: {
        '' : {
          templateUrl: 'partials/nav.mechanics.html'
        },
        'theView@mechanics' : {
          templateUrl: "partials/mechanics.html"
        }
      },
    })
    .state('administrator', {
      url: "/administrator",
      views: {
        '' : {
          templateUrl: 'partials/nav.admin.html'
        },
        'theView@administrator': {
          templateUrl: "partials/administrator.html"
        }
      },
    })
    .state('logout', {
      url: "/logout",
      templateUrl: 'partials/logout.html'
    });
  $locationProvider.html5Mode(true);
});  

app.run(['$rootScope', 'AdminService', '$state', '$location', function($rootScope, AdminService, $state, $location) {
  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (AdminService.getUser()){
       if (toState.templateUrl == 'partials/login.html' || toState.templateUrl == 'partials/signup.html') {
        $location.path('/dashboard'); 
      } 
    }
  });
}]);