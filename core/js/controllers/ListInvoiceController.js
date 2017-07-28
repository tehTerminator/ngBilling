app.controller('ListInvoiceController', function($scope, $http, $routeParams){
    $scope.invoiceType = $routeParams.type;
    $scope.label1 = "Customer";

    $scope.initialize = function(){
        
        if( $scope.invoiceType === "purchase" ){
            $scope.label1 = "Supplier";
            $scope.type = 0;
        } else{
            $scope.label1 = "Customer";
            $scope.type = 1;
        }
    }
})