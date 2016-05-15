(function(){
  /*  Angular APP
   *  Author: WesleyCSJ
   *  Copyleft 2016 - This code is under GNU License - GPL 3.0
   *  More information: http://www.gnu.org/licenses/gpl-3.0.en.html
   *  
   */
  var app = angular.module("Crud",['ngRoute','ngAnimate','requestModule']);
  
  //Configuring routes
  app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {templateUrl: 'templates/principal.html'})
                  .when('/insert', {templateUrl: 'templates/insert.html'})
                  .when('/update', {templateUrl: 'templates/update.html'})
                  .when('/list', {templateUrl: 'templates/list.html'})
                  .when('/drop', {templateUrl: 'templates/drop.html'})
                  .otherwise({
                    redirectTo: '/#/'
                  });
  }]);
})();