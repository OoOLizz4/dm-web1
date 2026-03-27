<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>
    <link rel="stylesheet" href="\assets\style\carte.css">

    <title>✿ฺ Carte </title>
</head>
<body>

    <div id = app>

    <div id="entete">

        <h1>(ノ・∀・)ノ C'est parti pour la géogarphie ! 」(￣▽￣」) </h1>
        <p>Cherche une ville que tu veux montrer sur la carte !</p>
        <form @submit.prevent="submit">

            <select name="option">
                <option value="commence"> commence par </option>
                <option value="contient"> contient </option>
                <option value="fini"> fini par </option>
            </select>

            <input 
                type="text"
                v-model="locaSaisie" 
                @input = "autocomplete"
            >
            <button>Go</button>
        </form>
        <button> Commence par Saint </button> <button> Fini par esse </button>

        <ul id="villes" v-if = "listeProp.length"> 
            <li v-for = "ville in listeProp" @click = "geometrie(ville.insee)"> {{ville.nom}}-{{ville.insee}} </li>                 
        </ul>

    </div>

    </div>

    <div id="map"> 

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="\assets\js\carte.js"></script>

</body>
</html>