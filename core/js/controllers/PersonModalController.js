app.controller('PersonModalController', function($scope, $http){
    $scope.person = {};

    $scope.addPerson = function(){
        var request = {
            'queryType' : 'insert',
            'tableName' : 'person',
            'params' : {
                'columnNames' : ['name', 'company', 'address', 'contact', 'tax_id'],
                'userData' : $scope.person
            }
        }

        console.log(request);

        $http.post(link, request)

        .success(function(response){
            console.log(response);
            jQuery(".ui.tiny.modal").modal('hide');
        })
    }
})