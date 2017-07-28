app.controller('InvoiceTableController', function($scope, $http){
    $scope.invoices = [];
    $scope.selectedInvoice = {};

    $scope.initialize = function(){
        var req = {
            'queryType' : 'select',
            'table' : ''
        }
    }

    $scope.selectInvoice = function(invoice){
        $scope.selectedInvoice = invoice;
    }

})