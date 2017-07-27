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
        }
    }
})

.directive('newPersonModal', function(){
    return{
        templateUrl : 'components/addPersonModal.html',
    }
})

.directive('paginationTable', function(){
    return{
        templateUrl : 'components/dataTable.html',
        controller : 'TableController',
        transclude : true,
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