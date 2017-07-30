app.controller('InvoiceController', function($http, $scope, $routeParams, $window){
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.transaction = {
        'quantity'     : 0,
        'rate'         : 0,
        'sgst_rate'    : 0,
        'sgst_amount'  : 0,
        'cgst_rate'    : 0,
        'cgst_amount'  : 0,
        'amountExTax'  : 0,
        'amountIncTax' : 0,
        'totalTax'     : 0
    };
    $scope.transactions = [];
    $scope.type = $routeParams.type;
    $scope.step = 0;
    $scope.selectedPerson = {};

    var PURCHASE_INVOICE = 0;
    var SALES_INVOICE = 1;

    $scope.initialize = function(){
        if( $scope.type === "purchase"){
            $scope.label1 = "Suppliers Details";
            $scope.label2 = "Suppliers GST Number"
            $scope.updateProductDetailsLink = "core/php/updateProductQuantity.php";
            $scope.invoiceType = PURCHASE_INVOICE;
        }else{
            $scope.label1 = "Customer Details";
            $scope.label2 = "Customers GST Number";
            $scope.updateProductDetailsLink = "core/php/consumeProducts.php";
            $scope.invoiceType = SALES_INVOICE;
        }
    }

    $scope.$on('PersonSelected', function(event, args){
        $scope.selectedPerson = args.data;
        $scope.step = 1;
    })

    $scope.$on('AddButtonClick', function(){
        jQuery(".ui.tiny.modal").modal('show');
    })

    $scope.computeData = function(){
        $scope.transaction.totalTax = $scope.transaction.cgst_amount + $scope.transaction.sgst_amount;
        $scope.transaction.sgst_amount = $scope.transaction.amountExTax * $scope.transaction.sgst_rate / 100;
        $scope.transaction.cgst_amount = $scope.transaction.amountExTax * $scope.transaction.cgst_rate / 100;
        $scope.transaction.amountExTax = $scope.transaction.quantity * $scope.transaction.rate;
        $scope.transaction.amountIncTax = $scope.transaction.amountExTax + $scope.transaction.totalTax;
    }

    $scope.getProducts = function(){
        var request = {
            'queryType' : 'select',
            'tableName' : 'product',
        };

        $http.post(link, request)

        .success(function(response){
            console.log(response);
            $scope.products = [];
            angular.forEach(response['serverData'], function(item){
                $scope.products.push( item );
            });
        });
    }

    $scope.addTransactionRow = function(){
        var row = jQuery.extend({}, $scope.transaction)
        
        row.product_id    = $scope.selectedProduct.id;
        row.product_name  = $scope.selectedProduct.name;
        row.unit          = $scope.selectedProduct.unit;

        var ItemAlreadyInTable = false;

        angular.forEach($scope.transactions, function(item){
            if( keepRunning = true ){
                if( item.product_id === row.product_id ){
                    item.quantity       += row.quantity;
                    item.amountExTax    += row.amountExTax;
                    item.sgst_amount    += row.sgst_amount;
                    item.cgst_amount    += row.cgst_amount;
                    item.totalTax       += row.totalTax;
                    item.amountIncTax   += row.amountIncTax;
                    ItemAlreadyInTable  = true;
                    keepRunning         = false;
                } 
            }
        });

        if( !ItemAlreadyInTable ){
            $scope.transactions.push( row );
        }

        $scope.transaction = {
            'quantity' : 0,
            'rate' : 0,
            'sgst_rate' : 0,
            'sgst_amount' : 0,
            'cgst_rate' : 0,
            'cgst_amount' : 0,
            'amountExTax' : 0,
            'amountIncTax' : 0,
            'totalTax' : 0
        };
    }

    $scope.selectProduct = function( product ){
        $scope.selectedProduct = product;
        console.log( $scope.selectedProduct );
    }

    $scope.showProductDetails = function(){
        if( $scope.selectedProduct === {} ){
            return;
        }
        else{
            $scope.$broadcast("ShowProductDetails", {
                product: $scope.selectedProduct
            });
        }
    }

    $scope.deleteRow = function(item){
        var index = $scope.transactions.indexOf( item );
        $scope.transactions.splice( index, 1 );
    }

    $scope.saveData = function(){
        var request = {
            'invoice_type'  : $scope.invoiceType,
            'person_id'     : $scope.selectedPerson.id,
            'transactions'  : $scope.transactions
        };

        console.log(request);

        $http.post("core/php/addInvoice.php", request)

        .success( function(response){
            console.log( response );
            var invoiceId = response.invoice_id;
            var url = "#/print/" + $routeParams.type + "/" + invoiceId;
            $window.location.href = url;
        })
    }
});