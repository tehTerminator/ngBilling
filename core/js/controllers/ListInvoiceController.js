app.controller('ListInvoiceController', function($scope){
    $scope.step = 0;
    $scope.selectedPerson = {};
    var PURCHASE_INVOICE = 0;
    var SALES_INVOICE = 1;
    
    $scope.$on('PersonSelected', function(event, args){
        $scope.step = 1;
        $scope.selectedPerson = args.data;
        $scope.$broadcast('LoadInvoices', {"data" : args.data });
        console.log("Customer Selected");
    });

});