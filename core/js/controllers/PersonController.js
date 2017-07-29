app.controller('PersonController', function($scope, $http, $filter){
    $scope.persons = [];
    $scope.selectedPerson = {};

    $scope.getPerson = function(){
        $http.get(link, {
            'queryType' : 'select',
            'tableName' : 'persons'
        })

        .success(function(response){
            console.log(response);
            angular.each(response.serverData, function(item){
                $scope.persons.push( item );
            });
        });

        $scope.emitDataLoaded();
    }

    $scope.emitDataLoaded = function(){
        $scope.$emit('DataLoaded', {data : $scope.persons.length});
    }

    $scope.selectPerson = function(person){
        $scope.selectedPerson = person;
        $scope.$emit('PersonSelected', {data : person});
    }

    $scope.$on("RefreshData", function(event, args){
        $scope.getPerson();
    })
})