angular.module('radio.controller')

	.controller('HashTagGlobalCtrl', function(Channel, $scope, $location) {

        $scope.tag_global = {};

        $scope.tag_global.queryTag = $location.search().tag;

		$scope.tag_global.addUnderline = function() {
			$(event.target).addClass('active');
			$(event.target).siblings('a').removeClass('active');
		}

})