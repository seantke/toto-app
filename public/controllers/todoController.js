angular.module("ToDo").controller('todoController', ['$scope','$http','$state', function($scope, $http, $state){
  if(!localStorage['user']){
    $state.go('login');
  }
  else{
    $state.go('application');
  }

  $scope.todos = [];

  $scope.getTodos = function(){
    $http.get("/todos").success(function(data){
      //console.log(data);
      $scope.todos = [];
      for(index in data){
        $scope.todos.push({
          'title': data[index].title,
          'done':data[index].done
        });
      }
    }).error(function(error){
      console.error(error);
    });
  };

  $scope.addTodo = function(){
    var newTodo = {
      title:$scope.newTodo,
      done:false
    }
    $http.post("/todos", newTodo).success(function(response){
      //console.log(response);
      $scope.newTodo = "";
      $scope.getTodos();
    }).error(function(error){
      console.error(error);
    });
  };

  $scope.clearCompleted = function(){
    $scope.todos = $scope.todos.filter(function(item){
      return !item.done;
    });
  };

  $scope.getTodos();
}]);
