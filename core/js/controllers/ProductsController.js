app.controller('ProductsController', function($http, $scope){
    $scope.categories = [];
    $scope.products = [];

    $scope.getCategories = function(){
        var request = {
            'queryType' : 'select',
            'tableName' : 'categories',
        };

        $http.post(link, request)

        .success(function(response){
            console.log( response );
            $scope.categories = [];
            angular.forEach(response['serverData'], function(item){
                $scope.categories.push( item );
            });
        });
    }

    $scope.createCategory = function(){
        var categoryName = jQuery("#categoryNameField").val();

        var request = {
            'queryType' : 'insert',
            'tableName' : 'categories',
            'params'    : {
                'columnNames' : ['name'],
                'userData' : {
                    'name' : categoryName
                }
            }
        };

        $http.post(link, request)

        .success(function(response){
            $scope.getCategories();
            var message = {
                'title' : "Success",
                'content' : "Successfully Inserted A New Category",
                'status' : "Success", 
            }

            $scope.$parent.showMessage( message );
        });
    }

    $scope.createProduct = function(){
        var productName = jQuery("#productNameField").val(),
            cid         = jQuery("#categoryIdField").val(),
            unit        = jQuery("#unitField").val(),
            qty         = jQuery("#availableQuantityField").val();


        var request = {
            'queryType' : 'insert',
            'tableName' : 'product',
            'params'    : {
                'columnNames' : ['name', 'category_id', 'unit', 'available_quantity'],
                'userData' : {
                    'name'          : productName,
                    'category_id'   : cid,
                    'unit'          : unit,
                    'available_quantity' : qty
                }
            }
        };

        $http.post(link, request)

        .success(function(response){
            console.log( response );
            var message = {
                'title' : "Success",
                'content' : "Successfully Inserted A New Product",
                'status' : "Success", 
            }

            $scope.$parent.showMessage( message );
        });
    }
})