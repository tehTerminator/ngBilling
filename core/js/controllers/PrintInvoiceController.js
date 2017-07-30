app.controller('PrintInvoiceController', function($scope, $routeParams, $http, $filter, $window){
    $scope.invoice_id = $routeParams.id;
    $scope.person = {};
    $scope.invoice = {};
    $scope.transactions = [];
    $scope.myCompany = {};
    $scope.total = {
        'amountIncTax' : 0,
        'amountExTax' : 0,
        'cgst_amount' : 0,
        'sgst_amount' : 0,
        'tax' : 0
    }

    $scope.getData = function(){
        var invoice_type = $routeParams.type == "purchase" ? 0 : 1;

        var request = {
            'queryType' : 'select',
            'tableName' : 'invoices',
            'params' : {
                'conditions' : {'id' : $scope.invoice_id, 'type' : invoice_type }
            }
        };

        var req2 = {
            'queryType' : 'select',
            'tableName' : 'transaction',
            'params' : {
                'columnNames' : ['transaction.*', 'product.name as product_name', 'product.unit as unit'],
                'conditions' : {'invoice_id' : 1},
                'join' : 'product on product.id = transaction.product_id'
            }
        };

        var req3 = {
            'queryType' : 'select',
            'tableName' : 'person',
            'params' : {
                'conditions' : {'id' : 0}
            }
        };
        
        var req4 = {
            'queryType' : 'select',
            'tableName' : 'settings'
        };

        $http.post(link, request)

        .success(function(response){
            console.log(response);
            if( response.affectedRows == 0 ){
                $window.location.href="#/404";
            }
            angular.forEach(response.serverData, function(item){
                $scope.invoice = item;
            });

            req2.params.conditions.invoice_id = $scope.invoice.id;
            req3.params.conditions.id = $scope.invoice.person_id;

            $http.post(link, req2)
            .success(function(response){
                angular.forEach(response.serverData, function(item){
                    item['tax'] = parseFloat(item.sgst_amount) + parseFloat(item.cgst_amount);
                    item['amountIncTax']        =  parseFloat(item.amountExTax) + item.tax;
                    $scope.total.amountExTax    += parseFloat(item.amountExTax);
                    $scope.total.amountIncTax   += item.amountIncTax;
                    $scope.total.sgst_amount    += parseFloat(item.sgst_amount);
                    $scope.total.cgst_amount    += parseFloat(item.cgst_amount);
                    $scope.total.tax            += item.tax;
                    console.log(item);
                    $scope.transactions.push(item);
                });
            });

            $http.post(link, req3)
            .success(function(response){
                angular.forEach(response.serverData, function(item){
                    $scope.person = item;
                });
            });

        });

        $http.post(link, req4)
        .success(function(response){
            console.log(response);
            angular.forEach(response.serverData, function(item){
                $scope.myCompany[item.name] = item.data;
            })
        })
    }
});