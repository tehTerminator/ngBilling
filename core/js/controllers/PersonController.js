app.controller('PersonController', function($scope, $http){
    $scope.persons = [];
    $scope.selectedPerson = {};
    $scope.pageLength = 0;
    $scope.pageIndex = 0;
    $scope.queryText = "";

    $scope.getPerson = function(){
        $http.get(link, {
            'queryType' : 'select',
            'tableName' : 'persons'
        })

        .success(function(response){
            angular.each(response.serverData, function(item){
                $scope.persons.push( item );
            });
        });

        $emit('dataLoaded', {data : persons.length});
    }

    $scope.selectPerson = function(person){
        $scope.selectedPerson = person;
        $emit('personSelected', {data : person});
    }
})