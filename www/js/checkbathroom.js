				// Converts numeric degrees to radians
				function toRad(Value) {
					return Value * Math.PI / 180;
				}

				function calcDistance(lat1,lng1,lat2,lng2) {
					var R = 6371; // km
					var dLat = toRad(lat2-lat1);
					var dLon = toRad(lng2-lng1);
					var lat1 = toRad(lat1);
					var lat2 = toRad(lat2);

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
						Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					var d = R * c;
					return Math.floor(d*100)/100;
				};
				
				var distBetween = calcDistance(lat,lng,element.lat,element.lng);

				
							if(distBetween >= 0.5){
								updateBathroom();
								}else{
								addBathroom();
							}
						}
					}
				//}