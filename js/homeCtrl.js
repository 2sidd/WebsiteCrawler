var app = angular.module('webScraper', []);
app.controller('homeCtrl', function($scope, $http) {
    $scope.url = "";
    $scope.links;
    $scope.depth = 10;
    $scope.fetchContent = function() {

        let data = {
            requestedURL: ($scope.url.indexOf('://') == -1) ? 'http://' + $scope.url : $scope.url,
            depth: $scope.depth
        };
        let config = {
            params: data,
            headers: { 'Accept': 'application/json' }
        };

        $http.get('http://localhost:3300/crawler', config).then(function(response) {
            $scope.links = response.data;
        }, function(response) {});
    }
});