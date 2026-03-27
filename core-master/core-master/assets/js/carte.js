/* Affichage de la carte */ 

let map = L.map('map').setView([45.774023,4.863385], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
            
            let marker = L.marker(positionCorrigee).addTo(map)
              .bindPopup(insee)
              .openPopup();
          
            let bounds = geomCommunes.getBounds();
            map.fitBounds(bounds)

          })
        }
      }
      
    }).mount('#app');