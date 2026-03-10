/* Affichage de la carte */ 

let map = L.map('map').setView([45.774023,4.863385], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// /* Affichage de polygones */

// let polygons = [[[[48.857757564566924,2.339316137485028],[48.856806083163775,2.3410084512700275],[48.85500429223433,2.3431007664951173],[48.85424556800601,2.3448607983431384],[48.85346104822773,2.3470146522513193],[48.852722069967,2.348637735017842],[48.852246283670866,2.3498685086796596],[5.513516521235,3.512416589454425],[48.85158827389591,2.352683903431068],[48.85202863524094,2.352391594686386],[48.85372424333016,2.3520685166001587],[48.8546352926156,2.3512762060553634],[48.85546534530812,2.3495454305934325],[48.855769019683805,2.3483223492670007],[48.85667497062573,2.3452915691247744],[48.857282302859346,2.3412992470592533],[48.857757564566924,2.339316137485028]]],[[[48.85374747782521,2.3530207906753438],[48.85253332128681,2.3532408660072544],[48.85163103910017,2.353884163131301],[48.85105178764471,2.3558479122468126],[48.849893264629145,2.3592336865839],[48.84948109132219,2.360317134371768],[48.85032771390132,2.36001241468143],[48.85104064812796,2.3601478456549136],[48.85167559662685,2.35960612176098],[48.85373633890825,2.353410154724109],[48.85374747782521,2.3530207906753438]]]]
// let newPolygons = []
 
// polygons.forEach((polygon,i) =>{
//     newPolygons[i] = [];
//     polygon.forEach((shape,j) =>{
//         newPolygons[i][j] = [];
//         shape.forEach((point,k)=> {
//             if (point[0] < 48.86 && point[0] > 48.84 && point[1] > 2.33 && point[1] < 2.37) {
//                 let lat = Number(point[0].toFixed(5));
//                 let lon = Number(point[1].toFixed(5));
                
//                 newPolygons[i][j].push([lon,lat]);
//             }
//         });
//     });
// });

// let geojson = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "coordinates": newPolygons,
//         "type": "MultiPolygon"
//       }
//     }
//   ]
// };


// L.geoJSON(geojson).addTo(map);


/* Geolocalisation */

// let position = navigator.geolocation.getCurrentPosition(function (position) {
//     console.log(position.coords.latitude, position.coords.longitude, position.coords.altitude);
// })

// L.marker([position.coords.latitude,position.coords.longitude]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup("Vous êtes ici");



// Interaction avec la carte

Vue.createApp({
  data() {
    return {
      locaSaisie : '',
      listeProp : [],
      urlInseeGeom : ''
    };
  },


  computed: {
    urlConstruite() {
      return "https://data.geopf.fr/geocodage/search?q=" + this.locaSaisie
    },
    rechercheLocaConstruit(){
      return "http://localhost/rechercheLoca?locaSaisie=" + this.locaSaisie
    },
  },

  methods : {
    submit(){
        console.log("Submit a été lancé")
        fetch(this.urlConstruite)
        .then (function(result1){
            console.log(result1)
            return result1.json()
        })
        .then(function(result2){
            console.log(result2)
            let position = result2.features[0].geometry.coordinates
            console.log("Position récupérée" + position)

            let positionCorrigee = position.slice('').reverse()
            console.log("Position Corigée pour affichage marqueur" + positionCorrigee)
          
            let marker = L.marker(positionCorrigee).addTo(map)
        })
    },

    autocomplete(){
      console.log("Input a été lancé")
      fetch(this.rechercheLocaConstruit)
      .then ((result1)=>{
        console.log(result1)
        return result1.json()
      })
      .then((result2) => {
        this.listeProp=result2;
        console.log(result2)
      })
    },

    geometrie(insee){
      console.log("Geometrie a été lancée pour ")
      console.log(insee)

      this.listeProp = [];

      this.urlInseeGeom = "http://localhost/affichageGeom?insee=" + insee
      
      fetch(this.urlInseeGeom)
      .then (res => res.json())
      .then((donnees) => {
        console.log(donnees)

        let geomCommunes = L.geoJSON(donnees).addTo(map);
        
        let bounds = geomCommunes.getBounds();
        map.fitBounds(bounds)
      })
    }
  }

}).mount('#app');