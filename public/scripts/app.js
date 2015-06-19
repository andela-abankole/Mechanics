var app = angular.module('Mechanic', ['ui.router', 'ngCookies', 'ngFileUpload', 'angular-loading-bar']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider){
  cfpLoadingBarProvider.includeSpinner = false;
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/landing.html"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "partials/login.html"
    })
    .state('signup', {
      url: "/signup",
      views: {
        '' : {
          templateUrl: 'partials/nav.signup.html'
        },
        'theView@signup': {
          templateUrl: "partials/signup.html" 
        }
      }
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
    .state('lockscreen', {
      url: "/lockscreen",
      templateUrl: 'partials/lockscreen.html'
    })    
    .state('logout', {
      url: "/logout",
      templateUrl: 'partials/logout.html'
    });
  $locationProvider.html5Mode(true);
});  

app.run(['$rootScope', 'AdminService', '$state', '$location', function($rootScope, AdminService, $state, $location) {
  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (AdminService.getUser()) {
       if (toState.templateUrl == 'partials/login.html' || toState.templateUrl == 'partials/signup.html' || toState.templateUrl == 'partials/logout.html') {
        $location.path('/dashboard'); 
      } 
    }

    if (!AdminService.getUser()) {
      if (toState.templateUrl == 'partials/lockscreen.html') {
       $location.path('/admin');
      }
    }
  });
}]);