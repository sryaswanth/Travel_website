let platform = new H.service.Platform({
    'apikey': 'en34chtTDgPzUOC--pz9j_sJOVmayizq-XrKnmEeelw'
  });

// this function is to provide landmark details
function landmarkGeocode() {
    let title = document.querySelector('.locationss').textContent;
    console.log(title)

    var geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title,
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showmap,
      (e) => console.log(e)
    );
  }

function showmap(result){

    let location = result.response.view[0].result[0].place.locations[0].displayPosition;//.place.locations[0].displayPosition;  // this is used to obtain the atitue and longitude // this path is obtained by inspecting in  console log
    console.log(location);    // try console.log and deep dive into that object to undertand the above mentioned path

      // Obtain the default map types from the platform object:
let defaultLayers = platform.createDefaultLayers();            // layer of the map is created

    // Instantiate (and display) a map object:
let map = new H.Map(                           // to initialize the map, we create a variable called map 
    document.querySelector('.map'),        // insert the map
    defaultLayers.vector.normal.map,         // specify the type of map (here: it is normal)
    {                                              // third argument is a .js object with 2 obligatory conditions zoom and center
      zoom: 10,
      center: { lat: location.latitude, lng: location.longitude}
    });

    let mark = new H.map.Marker({lat: location.latitude, lng: location.longitude});   // for markers on the map 
    map.addObject(mark);

   let ui = H.ui.UI.createDefault(map, defaultLayers);      // this is for zoom in and out 

}




landmarkGeocode();