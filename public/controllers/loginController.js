angular.module("ToDo").controller("LoginController", function($scope, $http, $state){
  // Variables
  $scope.signUpInfo = {
    username: undefined,
    password:undefined,
    repeatPassword:undefined
  };
  $scope.loginInfo = {
    username: undefined,
    password:undefined
  };
  // Functions

  $scope.logUserIn = function(){
    var data = {
      username:$scope.loginInfo.username ,
      password:$scope.loginInfo.password
    }
    $http.post("/login", data).success(function(response){
      console.log(response);
      localStorage.setItem("user", response);
      $state.go("application");
    }).error(function(error){
      console.error(error);
    });
  }

  $scope.logUserOut = function(){
    localStorage.clear();
    $state.go("login");
  }

  $scope.signUserUp = function(){
    var data = {
      username:$scope.signUpInfo.username ,
      password:$scope.signUpInfo.password
    }

    $http.post("/signup", data).success(function(response){
      console.log(response);
    }).error(function(error){
      console.error(error);
    });
  };

  $scope.matchPassword = function(){
    if($scope.signUpInfo.password === $scope.signUpInfo.repeatPassword){
      $scope.signUserUp();
      $scope.signUpInfo = {};

      return true;
    }
    else{
      console.log("Passwords dont match");
      return false;
    }
  };
});
