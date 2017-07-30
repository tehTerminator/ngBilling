app.controller('InvoiceTableController', function($scope, $http, $routeParams, $window){
    $scope.invoices = [];
    $scope.selectedInvoice = {};
    $scope.selectedCustomer = {};
    $scope.invoiceType = 0;
    $scope.type = $routeParams.type;

    var PURCHASE_INVOICE = 0;
    var SALES_INVOICE = 1;

    $scope.$on('LoadInvoices', function(event, args){
        $scope.selectedCustomer = args.data;
        console.log(args);
        $scope.getInvoices();
    });

    $scope.getInvoices = function(){

        $scope.invoiceType = SALES_INVOICE;
        if( $scope.type === "purchase"){
            $scope.invoiceType = PURCHASE_INVOICE;
        }

        $http.post(link, {
            'queryType' : 'select',
            'tableName' : 'invoices',
            'params' : {
                'columnNames' : [
                    'invoices.*', 
                    'sum(transaction.amountExTax + transaction.sgst_amount + transaction.cgst_amount) as totalAmount'
                ],
                'conditions' : {
                    'invoices.person_id'    : $scope.selectedCustomer.id, 
                    "invoices.type"         : $scope.invoiceType 
                } ,
                'join'      : 'transaction on invoices.id = transaction.invoice_id',
                'group by'  : 'invoices.id'
            }
        })

        .success(function(response){
            console.log(response);
            $scope.invoices = [];
            angular.forEach(response['serverData'], function(item){
                $scope.invoices.push(item);
            });

            $scope.emitDataLoaded();
        })
    }

    $scope.$on('RefreshData', function(){
        $scope.getInvoices();
    })

    $scope.emitDataLoaded = function(){
        $scope.$emit('DataLoaded', {data : $scope.invoices.length});
    }

    $scope.selectInvoice = function(invoice){
        var url = "#/print/" + $routeParams.type + "/" + invoice.id;
        console.log(url);
        $window.location.href = url;
    }

})