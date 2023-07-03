<!-- Map.svelte -->
<head>
  <script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />

  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
  
</head>
<script> 
    // export let spots = [];
    // export let spots = [];
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import { createEventDispatcher } from 'svelte';
    import AuthOnly from './AuthOnly.svelte';
    import { spots } from '../coordinatesStore';

    // import Form from './Form.svelte';

    const dispatch = createEventDispatcher();
 


    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2VzdG9sZWFib2F0IiwiYSI6ImNsamsxaGl6eDBlZ3oza3BqMGw1aGh3eWsifQ.NSgJTA5_SAGkXBRrm-FKBA'
    let market;
    let map;

    onMount(() => {

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

        // Map initialization code
          mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
          map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            // center: [longitude, latitude], // Get your location
            center: [2.15, 41.39], // Barcelona
            zoom: 12,
          }); 
        
        

        // location search bar
        const geocoder = new MapboxGeocoder({
          accessToken: MAPBOX_ACCESS_TOKEN,
          marker: {
          color: 'orange'
          },
          mapboxgl: mapboxgl
        });
        map.addControl(geocoder)

        // draggable marker
        const marker = new mapboxgl.Marker({
          draggable: true, color: 'red', 
        })
        .setLngLat([2.15, 41.39])
        .addTo(map)

        // geocoder value address
        geocoder.on('result', (e) => {
          const selectedFeature = e.result;
          const selectedName = selectedFeature.place_name;
          dispatch('selectedLocationChange', selectedName);

          // spots = [...spots, selectedName]
          spots.update(existingSpots => [...existingSpots, selectedName]);

          console.log('Selected Name:', selectedName);
          console.log($spots)
        });

        // get moving marker
        function onDrag() {
          console.log('Market is moving!')
        }

        marker.on('dragend', onDragEnd); // obtain marker last position
        marker.on('drag', onDrag); // detect if marker is moving
      
        // set your location if permitted
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        // Create a default Marker and add it to the map.
        const marker1 = new mapboxgl.Marker()
        .setLngLat([2.16, 41.38]) //Fleka
        .addTo(map);

        // Create a default Marker and add it to the map.
        const marker2 = new mapboxgl.Marker()
        .setLngLat([2.1319, 41.3754]) //Ametller origen
        .addTo(map);

        // display dragable marker coordinates on screen
        function onDragEnd() {
          const lngLat = marker.getLngLat();

          coordinates.style.display = 'block';
          coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
          // coordinates.set({ lng: lngLat.lng, lat: lngLat.lat });
        };
        
        error => {
          console.error('Error getting current location:', error);
        }
        


      });

    });
  </script>
  
  <style>
    #map {
      
      /* padding: 2rem; */
      margin: 0 auto;
      
      height: 500px;
      width: 800px;
    }

    .coordinates {
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      position: absolute;
      bottom: 40px;
      left: 10px;
      padding: 5px 10px;
      margin: 0;
      font-size: 11px;
      line-height: 18px;
      border-radius: 3px;
      display: none;
    }

    /* #geocoder-container > div {
      min-width: 50%;
      margin-left: 25%;
    } */
  </style>
  
  <div id="map"></div>
  <pre id="coordinates" class="coordinates"></pre>
  <!-- <Form /> -->
  <AuthOnly />


  