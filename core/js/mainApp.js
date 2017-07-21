var app = angular.module('BillingApp', ['ngRoute']);
var link = "core/php/sql.php";


app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            'templateUrl'   : 'pages/products.html',
            'controller'    : 'ProductsController'
        })

        .when('/invoice/:type', {
            'templateUrl'   : 'pages/createInvoice.html',
            'controller'    : 'InvoiceController'
        })

        .when('/products', {
            'templateUrl'   : 'pages/products.html',
            'controller'    : 'ProductsController'
        })


        .when('/print/:type', {
            'templateUrl' : 'pages/ListInvoice.html',
            'controller' : 'ListInvoiceController'
        })

        .when('/print/:type/:id', {
            'templateUrl' : 'pages/bill.html',
            'controller' : 'PrintInvoiceController'
        })

        .otherwise({
            'redirectTo'    : '/'
        });
})