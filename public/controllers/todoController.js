(function(){
  angular.module("ToDo").controller('todoController', ['$scope','$rootScope','$http','$state', function($scope, $rootScope, $http, $state){
    $scope.todos = [];
    $scope.getTodos = function(){
      var query = {
        createdBy: $rootScope.session.user
      };
      $http.post("/todos/get", query).success(function(data){
        //console.log(data);
        $scope.todos = [];
        for(index in data){
          $scope.todos.push({
            "_id": data[index]._id,
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
      if($rootScope.session.user){
        var newTodo = {
          title:$scope.newTodo,
          createdBy:$rootScope.session.user,
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

    $scope.getTodos();
  }]);
}());
