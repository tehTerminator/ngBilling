app.controller('StatController', function($scope, $http, $attrs, $timeout){
    $scope.label = "";
    $scope.count = 0;

    $scope.initialize = function(){
        $timeout(function(){
            var request = {
                'queryType' : 'select',
                'tableName' : $attrs.table,
                'params' : {
                    'columnNames' : ['count(' + $attrs.count + ') as count']
                }
            };

            $http.post(link, request)
            .success(function(res){
                angular.forEach(res.serverData, function(item){
                    $scope.count = item.count;
                });
            });
        }, 2000);
    }
});