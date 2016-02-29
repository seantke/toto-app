angular.module('ToDo', ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state("login", {
        url:"/",
        views: {
          todo:{
            template:"<h1>Please Sign In</h1>"
          },
          login:{
            controller:"LoginController",
            templateUrl:"/views/login.html"
          }
        }
      }).state("application",{
        url:"/app",
        views: {
          todo:{
            controller: "todoController",
            templateUrl:"/views/todo.html"
          },
          login:{
            controller:"LoginController",
            templateUrl:"/views/loggedIn.html"
          }
        }
      });
  });
