app.directive('navigationBar', function(){
    return {
        restrict: 'E',
        templateUrl : 'components/navigationBar.html',
    }
})

.directive('messageBox', function(){
    return {
        restrict : 'E',
        templateUrl : 'components/messageBox.html',
    }
})

.directive('productDetailsModal', function(){
    return{
        restrict : 'E',
        templateUrl : 'components/productDetailsModal.html',
        scope: true,
    }
})

.directive('personTable', function(){
    return {
        restrict : 'E',
        templateUrl : 'components/personTable.html',
        controller: 'PersonController',
        scope: {
            'count':'<',
            'index':'<',
            'query':'<',
            'label' : '<'
        }
    }
})

.directive('invoiceTable', function(){
    return{
        templateUrl : 'components/invoiceTable.html',
        controller : 'InvoiceTableController',
        scope: {
            'count':'<',
            'index':'<',
            'query':'<',
        }
    }
})

.directive('addPersonModal', function(){
    return{
        templateUrl : 'components/addPersonModal.html',
        controller : 'PersonModalController as personCtrl'
    }
})

.directive('paginationTable', function(){
    return{
        templateUrl : 'components/dataTable.html',
        controller : 'PaginationController',
        transclude : true,
    }
})

.directive('invoiceForm', function(){
    return {
        restrict : 'E',
        templateUrl : 'components/invoiceForm.html'
    }
})

.directive('transactionTable', function(){
    return{
        restrict : 'E',
        templateUrl : 'components/transactionTable.html'
    }
})