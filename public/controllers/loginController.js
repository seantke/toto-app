(function(){
  angular.module("ToDo").controller("LoginController", function($scope, $rootScope, $http, $state){

    // Variables
    $scope.signUpInfo = {};
    $scope.loginInfo = {};
    $scope.loginErrors = {};

    (function(){
      $rootScope.session = JSON.parse(localStorage.getItem("user"));
      if(!$rootScope.session){
        $state.go('login');
      }
      else{
        $http.post("/users/loggedIn", $rootScope.session).success(function(response){
          if(!response){
            $scope.logUserOut();
          }
          else{
            $state.go('application');
          }
        }).error(function(error){
          console.error(error);
        });
      }
    }());

    // Functions
    $scope.logUserIn = function(refData){
      var data = {
        username:$scope.loginInfo.username || refData.username,
        password:$scope.loginInfo.password || refData.password
      }
      $http.post("/users/login", data).success(function(response){
        // console.log(response);
        localStorage.setItem("user", response);
        $rootScope.session = JSON.parse(localStorage.user);
        $state.go("application");
      }).error(function(error){
        $scope.loginErrors.logIn = "Username or Password Incorrect";
        $scope.loginInfo = {};
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

      $http.post("/users/signup", data).success(function(response){
        // console.log(response);

      }).error(function(error){
        console.error(error);
      });
    };

    $scope.matchPassword = function(){
      if($scope.signUpInfo.password === $scope.signUpInfo.repeatPassword){
        $scope.signUserUp();
        // $scope.signUpInfo = {};
        // return true;
      }
      else{
        $scope.loginErrors.register = "Passwords don't match";
        return false;
      }
    };
  });
}());
