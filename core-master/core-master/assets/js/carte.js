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
      methode : '',
      listeProp : [],
      urlInseeGeom : '',
      currentLayer : null,
      currentMarker : null
    };
  },

  computed: {
    rechercheLocaConstruit(){
      return "http://localhost/rechercheLoca?locaSaisie=" + this.locaSaisie + "&methode=" + this.methode
    },
  },

  methods : {

    autocomplete(){
      console.log("Aucomplete a été lancé")
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

        if (this.currentLayer) {
          map.removeLayer(this.currentLayer);
        }
  
        if (this.currentMarker) {
          map.removeLayer(this.currentMarker);
        }

        this.currentLayer = L.geoJSON(donnees).addTo(map);

        let bounds = this.currentLayer.getBounds();
        map.fitBounds(bounds)

        let center = bounds.getCenter();

        this.currentMarker = L.marker(center).addTo(map)
          .bindPopup(insee)
          .openPopup();
      })
    }
  }
      
}).mount('#app');