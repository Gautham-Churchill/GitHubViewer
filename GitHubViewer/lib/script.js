import angular from 'angular';

angular.module('plunker', []).controller('MainCtrl', 
function($scope,$http,$interval,$log) {
  var onComplete = function(response) {
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then(onRepos,onError);
  }
  
  var onRepos = function (response) {
    $scope.repos = response.data;
  }

  var onError = function(reason) {
    $scope.error = 'Something went wrong.';
  }
  
  var decrementCount = function() {
    $scope.countDownTimer -= 1;
    if($scope.countDownTimer < 1) {
      $scope.search($scope.username);
    }
  }
  
  $scope.countDownInterval = null;
  var startCountDown = function() {
    $log.info("Initilazing");
    $scope.countDownInterval = $interval(decrementCount, 1000, 5);
  }
  
  $scope.search = function() {
    $http.get('https://api.github.com/users/'+$scope.username).
    then(onComplete,onError);
    if($scope.countDownInterval) {
      $interval.cancel($scope.countDownInterval);
      $scope.showTimer = {};
    }
  }
  $scope.username = 'docker';
  $scope.name = 'Github Viewer';
  $scope.sortByOrder = '+name';
  $scope.countDownTimer = 5;
  $scope.showTimer = null;
  startCountDown();
});
