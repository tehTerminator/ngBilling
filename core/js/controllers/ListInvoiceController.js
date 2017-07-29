app.controller('ListInvoiceController', function($scope, $http, $routeParams){
    $scope.type = $routeParams.type;
    $scope.selectedCustomer = {};
    $scope.invoices = [];
    $scope.step = 0;

    $scope.$on('CustomerSelected', function(event, args){
        $scope.selectedCustomer = args.data;
        $scope.step = 1;
        $scope.$broadcast('LoadInvoices', {'customer_id' : customer_id})
    });
    
});