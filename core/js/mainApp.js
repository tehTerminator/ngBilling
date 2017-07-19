var app = angular.module('BillingApp', ['ngRoute']);
var link = "core/php/sql.php";


app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            'templateUrl'   : 'pages/product.html',
            'controller'    : 'ProductController'
        })

        .when('/invoice/:type', {
            'templateUrl'   : 'pages/createInvoice.html',
            'controller'    : 'InvoiceController'
        })

        .when('/products', {
            'templateUrl'   : 'pages/products.html',
            'controller'    : 'ProductsController'
        })


        .when('/printSalesInvoice', {
            'templateUrl' : 'pages/printSalesInvoice.html',
            'controller' : 'PrintInvoiceController'
        })

        .otherwise({
            'redirectTo'    : '/'
        });
})