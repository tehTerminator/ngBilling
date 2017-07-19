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
        scope : false
    }
})

.directive('transactionsTable', function(){
    return{
        restrict : 'E',
        templateUrl : 'components/transactionsTable.html'
    }
})

.directive('invoiceForm', function(){
    return {
        restrict : 'E',
        templateUrl : 'components/invoiceForm.html',
        scope : false
    }
})