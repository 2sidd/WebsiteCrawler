var app = angular.module('webScraper', []);
app.controller('homeCtrl', function($scope, $http) {
    $scope.url = "";
    $scope.links;
    $scope.depth = 10;
    $scope.fetchContent = function() {
        let url = $scope.url;
        url = (url.indexOf('://') == -1) ? 'http://' + url : url;
        var data = {
            requestedURL: url,
            depth: $scope.depth
        };
        var config = {
            params: data,
            headers: { 'Accept': 'application/json' }
        };

        $http.get('http://localhost:3300/crawler', config).then(function(response) {
            $scope.links = response.data;
        }, function(response) {});
    }
});