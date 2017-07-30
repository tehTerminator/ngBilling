app.controller('ProductDetailsController', function($scope, $http){
    $scope.product = {};
    $scope.product_history = [];

    $scope.$on("ShowProductDetails", function(event, args){
        $scope.product = args.product;
        var request = {
            'queryType' : 'select',
            'tableName' : 'product_cost_history',
            'params' : {
                'conditions' : {'product_id' : $scope.product.id , 'quantity' : ['>', '0'] }
            }
        };

        $scope.product_history = [];

        $http.post(link, request)

        .success(function(response){
            console.log(response);
            angular.forEach(response['serverData'], function(item){
                $scope.product_history.push( item );
            });
        });


        $("#ProductDetailsModal").modal('show');
    })
})