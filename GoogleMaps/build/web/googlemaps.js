  //csv_nameはログで
google.maps.event.addDomListener(window, 'load', function() 
       { 
            var csvArray = csv2Array("newlog.csv");//csv読み込み
            csvArray.splice(0,1);//0番目の見出しを削除

            var lng = 139.81925904750824; 
            var lat = 35.6832894073129; 
 
            var mapOptions = { 
                zoom: 11, 
                center: new google.maps.LatLng(lat, lng), 
                mapTypeId: google.maps.MapTypeId.ROADMAP, 
                scaleControl: true 
            }; 
            var mapObj = new google.maps.Map(document.getElementById('gmap'), mapOptions); 
 
            var playerID="";
            var posArray=new Array();
            // マーカーを作成 
            for (var i = 0; i < csvArray.length; i++) { 
                var data = csvArray[i]; 
                if(data[1]===playerID){
                    var latlng = new google.maps.LatLng( data[5], data[4] ); 
                    var marker = new google.maps.Marker({ 
                        position: latlng, 
                        map: mapObj, 
                        title: data[0]+data[1]+data[3]
                    }); 
                    posArray.push(latlng);
                }
            }
               // ラインを作成 
                var polyLineOptions = { 
                    path: posArray, 
                    strokeWeight: 2, 
                    strokeColor: "#0000ff", 
                    strokeOpacity: "0.8" 
                }; 
             
            // ラインを設定 
            var poly = new google.maps.Polyline(polyLineOptions); 
            poly.setMap(mapObj); 
}); 
        
        /* csv読み込み。 */
       function csv2Array(filePath) { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
	var csvData = new Array();
	var data = new XMLHttpRequest();	
	data.open("GET", filePath, false); //true:非同期,false:同期
	data.send(null);
 
	var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
        }