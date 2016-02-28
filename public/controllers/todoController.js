(function(){
  angular.module("ToDo").controller('todoController', ['$scope','$rootScope','$http','$state', function($scope, $rootScope, $http, $state){
    if(!localStorage['user']){
      $state.go('login');
    }
    else{
      $rootScope.username = localStorage['user'];
      $state.go('application');
    }

    $scope.todos = [];

    $scope.getTodos = function(){
      var query = {
        createdBy: $rootScope.username
      };
      $http.post("/todos/get", query).success(function(data){
        //console.log(data);
        $scope.todos = [];
        for(index in data){
          $scope.todos.push({
            'title': data[index].title,
            'createdBy': data[index].createdBy,
            'done':data[index].done
          });
        }
      }).error(function(error){
        console.error(error);
      });
    };

    $scope.addTodo = function(){
      if($rootScope.username){
        var newTodo = {
          title:$scope.newTodo,
          createdBy:$rootScope.username,
          done:false
        }
        $http.post("/todos/create", newTodo).success(function(response){
          //console.log(response);
          $scope.newTodo = "";
          $scope.getTodos();
        }).error(function(error){
          console.error(error);
        });
      }
      else{
        console.error("not signed in");
      }
    };

    $scope.clearCompleted = function(){
      $scope.todos = $scope.todos.filter(function(item){
        return !item.done;
      });
    };

    $scope.getTodos();
  }]);
}());
