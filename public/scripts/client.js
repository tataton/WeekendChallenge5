var myApp = angular.module('myApp', []);

myApp.controller('PetListController', ['$scope', '$http', function($scope, $http) {

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
    }).then(getPets);
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

}]); // end PetListController
