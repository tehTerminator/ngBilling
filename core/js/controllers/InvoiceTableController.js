app.controller('InvoiceTableController', function($scope, $http){
    $scope.invoices = [];
    $scope.selectedInvoice = {};

    $scope.initialize = function(){
        var req = {
            'queryType' : 'select',
            'table' : ''
        }
    }

    $scope.$on('LoadInvoices', function(event, args){
        $http.post(link, {
            'queryType' : 'select',
            'tableName' : 'invoices',
            'params' : {
                'columnNames' : ['invoices.*', 'sum(transactions.total_amount) as totalAmount'],
                'condition' : {'invoices.customer_id' : args.customer_id } ,
                'join' : 'transactions on invoices.id = transactions.invoice_id'
            }
        });

        
    })

})