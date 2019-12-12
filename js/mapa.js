/*---------------------ANIMACIONES JQUERY------------------------------*/ 
$(document).ready(function(){
    //Toggle menu
    $("#menu").click(function(){
      $("#menu-mapa").slideToggle();
    });
    //Toggle boton ¿Que buscas?
     $("#boton-mapa-api").click(function(){
      $("#apartado-api").slideToggle();
    });
  
    //Efecto de boton ¿Que buscas?
    $("#boton-mapa-api").click(function(){
      //Se le agrega la clase cuando se abre el #apartado-api
          $("#boton-mapa-api").toggleClass("boton-activo");
    });
    
    $(".boton-mapa-menu").click(function(){
      $("header").slideToggle({height: "20px"});
    });
  });
  
  /*Se crea la variable 'link' donde se guardarán las coordenadas de cada local, luego se 
  utilizará para cambiar el centro del mapa cuando se haga click en él*/
  
  /*---------------------JS del sidebar------------------------------*/
  function sidebarListing() {
    //Se hace un fetch para traerse los datos de geojson y mostrarlos en el sidebar
    fetch('../mapa-api/map.json')
    .then(function(response) {
       return response.json();
     })
     .then(function(myJson){
      //Se guarda el geojson en una variable, en este caso 'geojson'
      let geojson = myJson;
      //Se crea otra variable de cada uno de los negocios dentro del geojson ('features')
      let features = geojson.features;
      //Se crea un loop que recogerá los valores de cada negocio y los mostrará en el sidebar
      for (let i = 0; i < features.length; i++) {
             //el valor 'name' de cada local
             let nombre = geojson.features[i].properties.name;
             //el valor 'servicios' de cada local
             let servicios = geojson.features[i].properties.servicios;
             //el valor 'descripcion' de cada local
             let descripcion = geojson.features[i].properties.address;
             
             
             //En el div #listings se agrega otro div (#listado-servicio)
             $("#listings").append('<div class="listado-servicio"></div>'); 
             //En el div #myUL se agrega un elemento li por cada feature en el geojson
             $("#myUL").append('<li class="servicios-listado">'+'</li>'); 
             //lo que se mostrará en el sidebar
             $(".servicios-listado").append('<div class="listado-servicio">' + '<a class="link" href="">' + nombre  + '<p>' + servicios + '</p>' + '</a>' + '<p id="descripcion">' + descripcion + '</p>'+ '</div>'); 
  
             
            }
     })
   }
  
   sidebarListing();
  /*---------------------JS GOOGLE MAPS API------------------------------*/ 
  //Funcion para iniciar el mapa
  function initMap() {
    // Estilos y especificaciones del mapa
    let map = new google.maps.Map(document.getElementById('map'), {
      //Centro del mapa
      center: {lat: 40.4165001, lng: -3.7025599},
      //escala del mapa
      zoom: 12,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });
     //Carga del geojson en el mapa
    let geojson =  map.data.loadGeoJson('../mapa-api/map.json');
    marker = map.data;
     // infowindow global (ventana de descripcion de los marcadores)
     let infowindow = new google.maps.InfoWindow();
  
     // Cuando el usuario haga click aparecerá una ventana de descripcion del marcador
     map.data.addListener('click', function(event) {
        let myHTML = "<h3>" + event.feature.getProperty("name") + "</h3>" + "<p>" + event.feature.getProperty("servicios")+"</p>" + "<p>" + event.feature.getProperty("address")+"</p>";
        myHTML += "<a target='_blank' href='"+ event.feature.getProperty('website')+"'>Página web</a>";
        infowindow.setContent("<div class='infowindow' style='width:200px; text-align: center;'>"+myHTML+"</div>");
        
        // Posiciona el infowindow en el marcador correspondiente
        infowindow.setPosition(event.feature.getGeometry().get());
        // anchor the infowindow on the marker
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
        infowindow.open(map);
        //El centro del mapa cambia al marcador seleccionado
        map.setCenter(event.feature.getGeometry().get());
  
        $("a").click(function(event) {
          // labels start at 1, array starts at 0
          map.panTomap(event.feature.getGeometry().get());
          map.setZoom(14);
          return false;
        });
  
      //   google.maps.addListener(link, 'click', function() {
      //     map.setCenter(event.feature.getGeometry().get());
      //     infowindow.open(map,event);
      //  });
    }); 
  
    // Iconos personalizados para los marcadores
    map.data.setStyle(function(feature) {
      return {icon:feature.getProperty('icon')};
    });
  
    //El mapa hace zoom cuando se clickea en un marcador
    map.data.addListener('click', function() {
      map.setZoom(14);
    }); 
  
    var labels = '123456';
    var labelIndex = 0;
    
    var locations = fetch('../mapa-api/map.json')
    .then(function(response) {
       return response.json();
     })
     .then(function(myJson){});
  
    
    var marker, i;
    var markers = [];
    for (i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        label: labels[labelIndex++ % labels.length],
      });
      markers.push(marker);
    };
    
  
    
  };
  
  
   /*---------------------Funcion de cambio de centro del mapa ------------------------------*/
  
  //  locations.eachLayer(function(locale) {
  //   var prop = locale.feature.properties;
  //   var popup = '<h3>Our Farms</h3><div>' + prop.title;
  //   var listing = listings.appendChild(document.createElement('div'));
  //   listing.className = 'item';
  //   var link = listing.appendChild(document.createElement('a'));
  //   link.href = '#';
  //   link.className = 'title';
  //   link.innerHTML = prop.title;
  //   if (prop.location) {
  //     link.innerHTML += '<br /><small class="quiet">' + prop.location + '</small>';
  //     popup += '<br /><small class="quiet">' + prop.location + '</small>';
  //   }
  //   var map2 = L.mapbox.tileLayer('mapbox.emerald');
  //   var details = listing.appendChild(document.createElement('div'));
  //   if (prop.crop) {
  //     details.innerHTML += ' Crop: ' + prop.crop;
  //     popup += '<br />Crop: ' + prop.crop;
  //   }
  //   link.onclick = function() {
  //     setActive(listing);
  //     map.setView(locale.getLatLng(), 16);
  //     map.addLayer(map2);
  //     locale.openPopup();
  //     locale.setIcon(L.mapbox.marker.icon({
  //               'marker-color': '#ff8888',
  //               'marker-size': 'large'
  //           }));
  //     return false;
  //   };
  //   locale.on('click', function(e) {
  //     map.panTo(locale.getLatLng());
  //     setActive(listing);
  //     locale.setIcon(L.mapbox.marker.icon({
  //               'marker-color': '#ff8888',
  //                'marker-size': 'large'
  //            })); 
  //   });
  //     map.on('click', function(e) {
  //     locale.setIcon(L.mapbox.marker.icon({
  //                   'marker-color': '#1087bf',
  //                   'marker-size': 'large'
  //               }));
  //   });
  //     popup += '</div>';
  //     locale.bindPopup(popup);
  //   });
  
  
  /*Relacionar clase 'link' con el infowondows*/
   /*---------------------Funcion de barra de búsqueda------------------------------*/
  function barraDeBusqueda() {
    // Variables declaradas
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop de todos los elementos de la lista, esconde los que no sean iguales al input
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  
  
   /*---------------------Funcion de filtrar------------------------------*/
  // function filtrar(){
  //   fetch('map.json')
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
  //     //guardar el geojson en una variable para ser usado
  //     let geojson = myJson;
  //     //cada uno de los locales dentro del json
  //     let features = geojson.features;
  //     //las checkboxes 
  //     let checkbox = document.querySelector('input'); 
  //     //los nombres de las checkboxes (hotel. clinica...)
  //     let checkboxName =  document.querySelector('input').name; 
  //     //for loop que pase por todos los features del json
  //     for (let i = 0; i < features.length; i++) {
  //       //el valor 'servicios' de cada local
  //       let servicios = geojson.features[i].properties.servicios;
  //       //si la checkbox esta checkeada y el nombre del servicio es igual a la checkbox...
  //       if(servicios == checkboxName || servicios === 0){
  //         console.log(servicios);
  //       }else{
  //         console.log(features[i].properties.servicios + '/no funciona');
  //       }
  
  //     }
  //   });
  
  // }
  
  /*pseudocodigo
  funcion filtrat(){
    let geojson = $.getJSON( "map.json");
    let servicios = geojson.feature.getProperty("servicios");
    let checkbox = document.querySelector('input'); 
    if(checkbox.checked = true){
      mostrar marker
    }else
    no mostrar
  }
  */ 
  
  
  