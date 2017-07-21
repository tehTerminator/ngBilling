app.controller('InvoiceController', function($http, $scope, $routeParams, $route){
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.transactions = [];
    $scope.product_history = [];
    $scope.rate = 0;
    $scope.quantity = 0;
    $scope.sgst_rate = 0;
    $scope.cgst_rate = 0;
    $scope.type = $routeParams.type;


    $scope.initialize = function(){
        if( $scope.type === "purchase"){
            $scope.label1 = "Suppliers Details";
            $scope.label2 = "Suppliers GST Number"
            $scope.updateProductDetailsLink = "core/php/updateProductQuantity.php";
            $scope.invoiceType = 0;
        }else{
            $scope.label1 = "Customer Details";
            $scope.label2 = "Customers GST Number";
            $scope.updateProductDetailsLink = "core/php/consumeProducts.php";
            $scope.invoiceType = 1;
        }
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

        var row = {
            product_id    : $scope.selectedProduct.id,
            product_name  : $scope.selectedProduct.name,
            quantity      : Number(jQuery("#quantityField").val()),
            rate          : Number(jQuery("#rateField").val()),
            sgst_rate     : Number(jQuery("#sgstRateField").val()),
            cgst_rate     : Number(jQuery("#cgstRateField").val()),
            amount        : Number(jQuery("#amountField").val()),
            newQty        : Number(jQuery("#quantityField").val()) + Number($scope.selectedProduct.quantity)
        }

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
        var request = {
            'queryType' : 'insert',
            'tableName' : 'invoices',
            'params' : {
                'columnNames' : ['details', 'tax_number', 'type'],
                'userData' : {
                    'details'       : jQuery("#suppliersDetailsField").val(),
                    'tax_number'    : jQuery("#suppliersGSTNumber").val(),
                    'type'          : $scope.invoiceType
                }
            }
        }

        $http.post(link, request)

        .success(function(response){
            console.log( response );
            var invoice_id = response.lastInsertId;
            $scope.saveTransaction(invoice_id);
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