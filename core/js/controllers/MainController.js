app.controller('MainController', function($scope, $http, $timeout, $location){

    $scope.message = {
        icon : 'information',
        status : 'success',
        title : 'Title Of Message',
        content : 'This is a message, We will notify you soon',
        hidden: true
    };

    $scope.showMessage = function(message){
        $scope.message = message;
        $scope.message.hidden = false;

        $timeout(function(){
            $scope.message.hidden = true;
        }, 5000);
    }

    $scope.initDropdown = function(){
        jQuery(".ui.dropdown").dropdown();
    }

    $scope.initModal = function(){
        jQuery(".ui.modal").modal();
    }

    $scope.getMenuClass = function(path){
        return ($location.path().substr(0, path.length) === path) ?  'active' : '';
    }
})