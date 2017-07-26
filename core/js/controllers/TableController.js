app.controller('TableController', function($scope){
    $scope.currentPage  = 0;
    $scope.pageLength   = 5;
    $scope.totalPages   = 0;
    $scope.pageSizes    = [5, 10, 15, 20, 25, 50];
    $scope.pageArray    = [];
    $scope.lastActivePage = 0;
    
    $scope.$on('InitializeTable', function(event, args){
        var totalItems = args.data;
        $scope.initialize( totalItems );
    });

    $scope.initialize(totalItems){
        $scope.totalPages = Math.ceil(totalItems / $scope.pageLength);
        $scope.pageArray = [];
        for( var i=1; i<=$scope.totalPages; i++){
            $scope.pageArray.push(i);
        }
    }

    $scope.firstPage = function(){
        $scope.currentPage = 0;
    }

    $scope.prevPage = function(){
        if( $scope.currentPage > 0 ){
            $scope.currentPage--;
        }
    }

    $scope.isFirst = function(){
        return $scope.currentPage == 0;
    }

    $scope.nextPage = function(){
        if( $scope.currentPage < $scope.pageArray.length ){
            $scope.currentPage++;
        }
    }

    $scope.isLast = function(){
        return $scope.currentPage == $scope.pageArray.length;
    }

    $scope.lastPage() = function(){
        $scope.currentPage = $scope.pageArray.length;
    }

    $scope.setPageLength = function( length ){
        $scope.pageLength = length;
    }

    $scope.resetPage = function(){
        if( $scope.queryText.length > 1){
            $scope.currentPage = 1;
        } if( $scope.queryText.length == 1){
            $scope.lastActivePage = $scope.currentPage;
            $scope.currentPage = 1;
        } 
        else{
            $scope.currentPage = $scope.lastActivePage;
        }
    }

    
})