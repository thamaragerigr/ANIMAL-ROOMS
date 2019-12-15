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

    // $(".boton-mapa-menu").click(function(){
    //   $("header").slideToggle();
    //   $(".boton-mapa-menu").animate({
    //     top: '20px',
    //   });
    // });
  });

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
    map.data.loadGeoJson('../mapa-api/map.json');
    markers = map.data;
     // infowindow global (ventana de descripcion de los marcadores)
     let infowindow = new google.maps.InfoWindow();

     let linkListing = document.querySelectorAll('.links'); 
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

        //El mapa hace zoom cuando se clickea en un marcador
        map.data.addListener('click', function() {
        map.setZoom(13);
        });

        //cierra la ventana de infowindow cuando se clickea fuera de ella
        google.maps.event.addListener(map, 'click', function() {
          infowindow.close();
        });
      //  document.querySelectorAll(".links-mapa").

      // Trigger a click event on each marker when the corresponding marker link is clicked
        $('.marker-link').on('click', function () {
        google.maps.event.trigger(markers[$(this).data('event')], 'click');
        });

        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          
        }
    });


      // function myClick(id){
  //       google.maps.event.trigger(markers[id], 'click');
  //   }
  /*Relacionar clase 'link' con el infowondows*/


    // Iconos personalizados para los marcadores
    map.data.setStyle(function(feature) {
      return {icon:feature.getProperty('icon')};
    });


  };

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
           $(".servicios-listado").append('<div class="listado-servicio">' + '<a class="links-mapa" href="#">' + nombre  + '<p>' + servicios + '</p>' + '</a>' + '<p id="descripcion">' + descripcion + '</p>'+ '</div>');
          }
        });
     }

 sidebarListing();


 
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


