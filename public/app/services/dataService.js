ngApp.service('dataService', ['$http', '$rootScope', function($http, $rootScope){
    this.getData = function(){
        var _url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
        return $http.get(_url).then(function(res){
            return res;
        }, function(err){
            $rootScope.failure();
        })
    }
}]);