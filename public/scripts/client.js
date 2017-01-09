var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when("/instructions", {
      templateUrl : "/routes/instructions.html",
      controller: "InstructController"
    })
    .when("/showallpets", {
      templateUrl : "/routes/showallpets.html",
      controller: "ShowAllController"
    })
    .when("/addpet", {
      templateUrl : "/routes/addpet.html",
      controller: "AddPetController"
    })
    .otherwise({
      redirectTo: "instructions"
    });
}]);

myApp.controller("InstructController", ["$scope", function($scope){
  console.log("Instructions");
}]);

myApp.controller("ShowAllController", ["$scope", "$http", function($scope, $http){
  console.log("Show All Pets");

  $scope.sortPets = false;

  $scope.sortAlpha = function(){
    $scope.sortPets = true;
  };

  $scope.deletePet = function(id){
    console.log('Deleting pet id ', id);
    $http({
      method: 'DELETE',
      url: '/pets/' + id
    }).then(getPets);
  };

  function getPets(){
    /* Function for getting all pets. Called when controller initializes, and
    then after any change. */
    console.log('In getPets.');
    $http({
      method: 'GET',
      url: '/pets'
    }).then(function(response) {
      $scope.petArray = response.data;
      console.log($scope.petArray);
    }); // end $http
  } // end getAssignments

  getPets();

}]);

myApp.controller("AddPetController", ["$scope", "$http", function($scope, $http){
  console.log("Add a pet");

  $scope.addPet = function() {
    // Method for adding a pet. Called by add pet button.
    var petToAdd = {
      name: $scope.petNameIn,
      animal: $scope.animalTypeIn,
      years_old: $scope.ageIn,
      imgurl: $scope.imgurlIn
    };
    console.log(petToAdd);
    $http({
      method: 'POST',
      url: '/pets',
      data: petToAdd
    });
  };

}]);
