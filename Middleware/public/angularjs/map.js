var maps = angular.module('mapctr',[]);


var cities = [
    {
        city : 'Location 1',
        desc : 'Test',
        lat : 35.238983,
        long : -120.888509 
    },
    {
        city : 'Location 2',
        desc : 'Test',
        lat : 33.238168,
        long : -119.238168
    },
    {
        city : 'Location 3',
        desc : 'Test',
        lat : 36.242452,
        long : -121.889882 
    },
    {
        city : 'Location 4',
        desc : 'Test',
        lat : 34.247234,
        long : -122.893567 
    },
    {
        city : 'Location 5',
        desc : 'Test',
        lat : 35.241874,
        long : -120.883568 
    }
];


maps.controller('mapctr',['$scope','$http', function($scope,$http,$ionicLoading){


$scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
      // Geo Location /
        navigator.geolocation.getCurrentPosition(function(pos) {
            var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                icon:image,
                title: "My Location"
            });
        });
        
        $scope.dvMap = map;
        // Additional Markers //
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.dvMap,
                animation: google.maps.Animation.DROP,
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.dvMap, marker);
            });
            $scope.markers.push(marker);
        }  
        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }

    };
    google.maps.event.addDomListener(document.getElementById("dvMap"), 'load', $scope.initialise());


$scope.searchItemRedirect = function(){
    window.location.assign("/search/?search="+$scope.q);
  }


}]);