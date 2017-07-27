app.controller('PersonController', function($scope, $http, $filter){
    $scope.persons = [
        {id: 1, name : "Prateek", company : "Maharaja Computers", contact : '9144268770', address : 'Ashoknagar', tax_id : 'NA'},
        {id: 2, name : "Poorwa", company : "TSS", contact : '220661', address : 'Ashoknagar', tax_id : '1234 '},
        {id:3, name: "Abhay", company : "Organics", address : 'Khajuriya', contact : '9406988707', tax_id:'5433'},
        {id:4, name: "Alka Kher", company : 'MPOnline', contact : "9425760707", address : "Kher Garden Ashoknagar", tax_id : "AVSPK"},
        {id:5, name:"John",company:'Intel',address:'Somewhere in New Delhi', contact :'8855423520', tax_id:'54646831'},
        {id:6, name:"Mike",company:'Intel',address:'Somewhere in New Bhopal', contact :'885542355', tax_id:'5464652'}
    ];
    $scope.selectedPerson = {};

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

        $scope.emitDataLoaded();
    }

    $scope.emitDataLoaded = function(){
        $scope.$emit('dataLoaded', {data : $scope.persons.length});
    }

    $scope.$on('SendData', function(event){
        $scope.emitDataLoaded();
    })

    $scope.selectPerson = function(person){
        $scope.selectedPerson = person;
        $scope.$emit('PersonSelected', {data : person});
    }
})