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
        templateUrl : 'component/personTable.html',
        controller: 'PersonController',
        scope: {
            'pageLength'    : '=',
            'pageIndex'     : '=',
            'queryText'     : '=',
            'initFunction'  : '&'
        }
    }
})

.directive('tableHeader', function(){
    return{
        restrict : 'E',
        templateUrl : 'components/tableHeader.html',
        controller : 'TableController'
    }
})

.directive('invoiceForm', function(){
    return {
        restrict : 'E',
        templateUrl : 'components/invoiceForm.html'
    }
})

.directive('transactionsTable', function(){
    return{
        restrict : 'E',
        templateUrl : 'components/transactionsTable.html'
    }
})