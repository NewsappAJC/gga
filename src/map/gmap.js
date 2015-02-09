$(document).ready(function () {

    //var _colors = [];
	var _colors_senate = [];
	var _colors_house = [];
    var color_counter = -1;
    var district_pos_array;
    /*for (var i = 1; i <= 180; i++) {
        _colors.push(getRandomColor());
    }
	var _tmp = '[ "';
	for (var i = 0; i < 180; i++){
		_tmp += _colors[i] + '", "';
	}
	_tmp += '" ]';
	console.log(_tmp);*/
	var _colors = [ "#7B8C73", "#63705C", "#4A5445", "#31382E", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#A08FA3", "#88738C", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#6D5C70", "#906699", "#362E38", "#A785AD", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#6D5C70", "#906699", "#362E38", "#A785AD", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#6D5C70", "#906699", "#362E38", "#A785AD", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#4D7326", "#4D7A1F", "#4D8217", "#4D8A0F", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#336105", "#336600", "#E6E8E3", "#E6EBE0", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#CCDBBD", "#CCE0B8", "#CCE6B3", "#CCEBAD", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#B3E87D", "#B3F075", "#B3F76E", "#B3FF66", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#808C73", "#809966", "#80A659", "#80B24D", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#669933", "#66A329", "#66AD1F", "#66B814", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#4D9108", "#4D9900", "#33382E", "#333D29", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#33570F", "#335C0A", "#4D7326", "#4D7A1F", "#6D5C70", "#906699", "#362E38", "#A785AD", "#7B8C73", "#63705C", "#4A5445", "#31382E", "#5F7A52", "#475C3D", "#33570F", "#335C0A", "#336105", "#336600" ];
	

    renderDistricts(56, 'Senate', _colors);
    fillArray('ga_senate.json');

    var map = new google.maps.Map(document.getElementById("map"), { center: { lat: 39.8, lng: -98.5}, 'mapTypeId': google.maps.MapTypeId.ROADMAP }),
	marker = new google.maps.Marker(),
	geocoder = new google.maps.Geocoder(),
    infoWindow = new google.maps.InfoWindow(),
	mapFeature;

    map.fitBounds(new google.maps.LatLngBounds(
		new google.maps.LatLng(34.4, -86.5),
		new google.maps.LatLng(30.757787, -80.630202)
	));

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
	
	google.maps.event.addListener(map, 'click', function (event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		showPoint(event.latLng);
		getLegislatorsByLocation(lat, lng);
    });

    var data_senate = new google.maps.Data();
    data_senate.loadGeoJson('ga_senate.json');	
    data_senate.setMap(map);
	google.maps.event.addListener(data_senate, 'click', function (event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		showPoint(event.latLng);
		getLegislatorsByLocation(lat, lng);
    });

    data_senate.setStyle(function (feature) {
		color_counter++;
		_colors_senate.push(_colors[color_counter]);
        return ({
            fillColor: _colors[color_counter],
            strokeColor: "#B2C2A3",
            strokeWeight: 1.1,
			fillOpacity: 0.85
        });
    });

    var data_house = new google.maps.Data();
    data_house.loadGeoJson('ga_house.json');
	google.maps.event.addListener(data_house, 'click', function (event) {
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		showPoint(event.latLng);
		getLegislatorsByLocation(lat, lng);
    });
	color_counter = -1;
    data_house.setStyle(function (feature) {
		color_counter++;
		_colors_house.push(_colors[color_counter]);
        return ({
            fillColor: _colors[color_counter],
            strokeColor: "#B2C2A3",
            strokeWeight: 1.1,
			fillOpacity: 0.85
        });
    });

	//Left panel tab click event
    $('ul.tab li').click(function () {
        if ($(this).hasClass('active')) {
            return;
        }
        map.setZoom(7);
        color_counter = 0;
        $('ul.tab li').removeClass('active');
        $(this).addClass('active');
        if ($(this).data('itemid') == '1') {
            renderDistricts(56, 'Senate', _colors_senate);
            data_house.setMap(null);
            data_senate.setMap(map);
            fillArray('ga_senate.json');
        } else {
            renderDistricts(180, 'House', _colors_house);
            data_senate.setMap(null);
            data_house.setMap(map);
            fillArray('ga_house.json');
        }
    });

    //Search address
    $('#address').keyup(function (e) {
        if (e.which == 13) {
            codeAddress($(this).val());
        }
    });

    $('#btnFind').click(function () {
        codeAddress($("#address").val());
    });

    function codeAddress(address) {
		$('.district-list').find('li').removeClass('active');
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;				
                showPoint(location);
				getLegislatorsByLocation(location.lat(), location.lng());
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    function showPoint(location) {
        map.setCenter(location);
        map.setZoom(10);
        marker.setMap(map);
        marker.setPosition(location);
        showPopup(location);
    }
	
	function goHomePosition() {
		var defaultLocation = new google.maps.LatLng(39.8, -98.5);		
        map.setCenter(defaultLocation);		
		map.fitBounds(new google.maps.LatLngBounds(
			new google.maps.LatLng(34.4, -86.5),
			new google.maps.LatLng(30.757787, -80.630202)
		));        
    }

    function showPopup(location) {
        infoWindow.setPosition(location);
        infoWindow.setContent('<div style="width:280px; height:180px; font-size:16px;">Loading...</div>');
        infoWindow.setMap(map);
    }

    function renderDistricts(d_length, d_name, d_colors) {
        $('.district-list').html('');
        var _list = '';
        for (var i = 1; i <= d_length; i++) {
            //_list += '<li data-did="' + i + '"><span class="item-color" style="background-color:'+d_colors[i-1]+'"></span><span>GA ' + d_name + ' district ' + i + '</span></li>';
			_list += '<li data-did="' + i + '"><span>GA ' + d_name + ' district ' + i + '</span></li>';
        }
        $('.district-list').append(_list);
        $('.district-list').find('li').click(function () {
            $('.district-list').find('li').removeClass('active');
            $(this).addClass('active');
			var point = district_pos_array[parseInt($(this).data('did')) - 1];            
			showPoint(point);
            //getLegislators($(this).data('did'));			
			getCenterPoint($(this).data('did'));
        });
    }

    function drawDistricts(json_source) {
        $.getJSON(json_source, function (data) {
            var features = map.data.addGeoJson(data);

            google.maps.event.addDomListener($('ul.tabs li'), 'click', function () {
                for (var i = 0; i < features.length; i++)
                    map.data.remove(features[i]);
            });
        });
    }

    function fillArray(json_source) {
        district_pos_array = [];
        $.getJSON(json_source, function (data) {
            for (var i = 0; i < data.features.length; i++) {
                var item = data.features[i].geometry.coordinates[0][0];
                if (!$.isArray(item[0])) {
                    district_pos_array.push(new google.maps.LatLng(item[1], item[0]));
                    //district_pos_array.push(item[1] + ',' + item[0]);
                } else {
                    district_pos_array.push(new google.maps.LatLng(item[0][1], item[0][0]));
                    //district_pos_array.push(item[0][1] + ',' + item[0][0]);
                }
            }            
        });
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#a1a';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getLegislators(districtNumber) {
        var url = 'http://openstates.org/api/v1/legislators/?apikey=9272d35da412492886ff2a164d8c5631&state=ga&district=' + districtNumber;		
        $.getJSON(url, function (data) {
			showInPopup(data);
        });
    }
	function getLegislatorsByLocation(lat, lng) {
        var url = 'http://openstates.org/api/v1/legislators/geo/?apikey=9272d35da412492886ff2a164d8c5631&lat=' + lat + '&long=' + lng;
        $.getJSON(url, function (data) {
			console.log(data);
			if (data && data.length > 0 && data[0].state == 'ga'){
				showInPopup(data);
			} else {
				infoWindow.close();
				goHomePosition();
			}
        });
    }
	function showInPopup(data){
		var rep_info = parseMemberInfo(data, 0);			
		var sen_info = parseMemberInfo(data, 1);				
		var _html = '<div class="p-content" style="width:280px; height:180px;">';
		_html += '<p class="t">State Legislators</p>';			
		_html += '<div class="m-info"><p>Senate District '+ sen_info.district +'</p><img src="' + sen_info.photo_url + '" /><a href="'+sen_info.url+'" target="_blank">Sen. ' + sen_info.fullname + '<br/>('+sen_info.party+')</a></div>';			
		_html += '<div class="m-info"><p>House District ' + rep_info.district + '</p><img src="' + rep_info.photo_url + '" /><a href="'+rep_info.url+'" target="_blank">Rep. ' + rep_info.fullname + '<br/>('+rep_info.party +')</a></div>';			
		_html += '</div>';
		infoWindow.setContent(_html);
	}
	function parseMemberInfo(data, i){
		var m_info = {
			fullname : data[i].full_name,
			party : data[i].party,
			photo_url : data[i].photo_url,
			district : data[i].district, 
			url : data[i].url
		};
		return m_info;
	}
	
	function getCenterPoint(district_name) {
		var url = 'http://openstates.org/api/v1/districts/boundary/sldl/ga-'+district_name+'/?apikey=9272d35da412492886ff2a164d8c5631'
		var result = '';
		$.getJSON(url, function (data) {
            console.log(data);			
			showPoint(new google.maps.LatLng(data.region.center_lat, data.region.center_lon));
			getLegislatorsByLocation(data.region.center_lat, data.region.center_lon);
        });
		return result;
	}

});