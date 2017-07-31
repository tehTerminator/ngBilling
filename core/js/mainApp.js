var app = angular.module('BillingApp', ['ngRoute']);
var link = "core/php/sql.php";


app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            'templateUrl'   : 'pages/dashboard.html',
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
            'templateUrl' : 'pages/printInvoice.html',
            'controller' : 'PrintInvoiceController'
        })

        .when('/404', {
            'templateUrl' : 'pages/404.html'
        })

        .otherwise({
            'redirectTo'    : '/404'
        });
})

.filter('dateToISO', function() {
  return function(input) {
      if( input != undefined )
        return new Date(input).toISOString();
      else
        return new Date().toISOString();
  };
});