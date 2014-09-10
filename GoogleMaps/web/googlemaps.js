  //csv_nameはログで
google.maps.event.addDomListener(window, 'load', function() 
       { 
            var csvArray = csv2Array("20140910_1630.csv");//csv読み込み
            csvArray.splice(0,1);//0番目の見出しを削除

            var lng = 139.81925904750824; 
            var lat = 35.6832894073129; 
 
            var mapOptions = { 
                zoom: 12, 
                center: new google.maps.LatLng(lat, lng), 
                mapTypeId: google.maps.MapTypeId.ROADMAP, 
                scaleControl: true 
            }; 
            var mapObj = new google.maps.Map(document.getElementById('gmap'), mapOptions); 
 
            var playerID="Zenkaku5";//player input
            
           
            var j = 0;
            var posArray=new Array();
            // マーカーを作成 
            for (var i = 0; i < csvArray.length; i++) { 
                var data = csvArray[i]; 
                if(data[1]===playerID){
                    var latlng = new google.maps.LatLng( data[5], data[4] ); 
                    var marker = new google.maps.Marker({ 
                        position: latlng, 
                        map: mapObj, 
                        title: data[0] + " " + data[1] + " " +data[3] //Date,ID,portalName
                    }); 
                       posArray.push(latlng);//位置情報を配列に入れる。
                       j++;
                }
            }
                console.log(posArray);
            var linecolor= ["#ff0000","#00ff00","#0000ff"];            
            var polyLine = new Array();
            

                for(var i=0;i < posArray.length-1;i++){
                   var tmp = [];
                   tmp.push(posArray[i]);
                   tmp.push(posArray[i+1]);
                   console.log(tmp);
                   polyLine.push(polyLineCreate(tmp,2,linecolor[i%3],"0.8"));
                };
                    console.log(polyLine);
                    var poly = new Array();
                   for(var i=0;i < polyLine.length;i++){
                       poly.push(new google.maps.Polyline(polyLine[i])); 
                   }
                   for(var i=0;i < poly.length;i++){
                       poly[i].setMap(mapObj); 
                   }
                   
                

                
//               // ラインを作成 ,色を変える。
//                var polyLineOptions = { 
//                    path: posArray, 
//                    strokeWeight: 2, 
//                    strokeColor: "#0000ff", 
//                    strokeOpacity: "0.8" 
//                }; 
//                var poly = new google.maps.Polyline(polyLineOptions); 
//                poly.setMap(mapObj);                 
             
       function polyLineCreate(path_,strokeWeight_,strokeColor_,strokeOpacity_){
                var polyLine = {    
                    path: path_, 
                    strokeWeight: strokeWeight_, 
                    strokeColor: strokeColor_, 
                    strokeOpacity: strokeOpacity_ 
                }
                return polyLine;
       }
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