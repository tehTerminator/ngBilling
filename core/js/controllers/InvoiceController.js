app.controller('InvoiceController', function($http, $scope, $routeParams, $route){
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
    $scope.product_history = [];
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
                    item.quantity += row.quantity;
                    item.amount += row.amount;
                    ItemAlreadyInTable = true;
                    keepRunning = false;
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
        $("#ProductDetailsModal").modal('show');

        var request = {
            'queryType' : 'select',
            'tableName' : 'product_cost_history',
            'params' : {
                'conditions' : {'product_id' : $scope.selectedProduct.id, 'quantity' : ['>', '0'] }
            }
        };

        $http.post(link, request)

        .success(function(response){
            console.log(response);
            $scope.product_history = [];
            angular.forEach(response['serverData'], function(item){
                $scope.product_history.push( item );
            });
        });

    }

    $scope.deleteRow = function(item){
        var index = $scope.transactions.indexOf( item );
        $scope.transactions.splice( index, 1 );
    }

    $scope.saveData = function(){
        var req1 = {
            'queryType' : 'insert',
            'tableName' : 'invoices',
            'params' : {
                columnNames : ['customer_id', 'type'],
                userData : {
                    'customer_id' : $scope.selectedPerson.id,
                    'type' : $scope.invoiceType
                }
            }
        };

        $http.post(link, req1)
        .success(function(res){
            var invoice_id = res.lastInsertId;

            var req2 = {
                'queryType' : 'insert',
                'tableName' : 'transactions',
                'params' : {
                    'columnNames' : ['invoice_id', 'product_id', 'quantity', 'rate', 'sgst_rate', 'sgst_amount', 'cgst_rate', 'cgst_amount', 'amountExTax']
                }
            };

            angular.forEach($scope.transactions, function(item){
                var req = jQuery.extend({}, req2);

                item.invoice_id = invoice_id;
                req.params.userData = item;

                $http.post(link, req);
                var req3;
                if( $scope.invoiceType == SALES_INVOICE ){
                    req3 = {
                        'queryType' : 'update',
                        'tableName' : 'products',
                        'params' : {
                            'columnNames' : ['quantity'],
                            'userData' : { 'quantity' : 'quantity - ' + item.quantity }
                        }
                    };
                    $http.post(link, req3);
                }
                else{
                    $http.post("core/php/updateProductQuantity.php", item);
                }

            });
        });
    }

    $scope.saveTransaction = function(invoice_id){

        var request = {
            'queryType' : 'insert',
            'tableName' : 'transaction',
            'params' : {
                'columnNames' : ['product_id', 'quantity', 'rate', 'sgst_rate', 'cgst_rate', 'invoice_id']
            }
        }

        var transactions = [];

        angular.forEach($scope.transactions, function(item){
            var req = jQuery.extend({}, request);
            req.params.userData = {
                'product_id' : item.product_id,
                'quantity' : item.quantity,
                'rate' : item.rate,
                'sgst_rate' : item.sgst_rate,
                'cgst_rate' : item.cgst_rate,
                'invoice_id' : invoice_id
            };

            transactions.push( req.params.userData );

            console.log( req );

            $http.post(link, req)

            .success(function(response){
                //Update product_cost_history
                console.log( response );
            });
        });

        $http.post( $scope.updateProductDetailsLink, transactions)
    
        .success(function(res){
            console.log(res);
        });

        var message = {
            'title' : "Success",
            'content' : "Successfully Inserted the Purchase Invoice",
            'status' : "success"
        };

        $route.reload();
        $scope.$parent.showMessage( message );
    }
})