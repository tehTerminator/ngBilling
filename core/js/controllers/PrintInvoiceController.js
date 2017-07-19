app.controller('PrintInvoiceController', function($scope, $route){
    $scope.companyName = "ABC Company";
    $scope.company_GST_Number = "123456";
    $scope.company_PAN_Number = "ABCDE1234F";

    $scope.getInvoiceDetails = function(){
        $http.post('core/php/getInvoiceDetails.php', )
    }
})