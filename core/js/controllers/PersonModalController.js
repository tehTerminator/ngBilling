app.controller('PersonModalController', function($scope, $http){
    $scope.person = {};

    $scope.addPerson = function(){
        var request = {
            'queryType' : 'select',
            'tableName' : 'persons',
            'params' : {
                'columnName' : ['name', 'company', 'address', 'contact', 'tax_id'],
                'userData' : $scope.person
            }
        }
        $http.post(link, request)

        .success(function(response){
            jQuery(".ui.tiny.modal").modal('hide');
        })
    }
})