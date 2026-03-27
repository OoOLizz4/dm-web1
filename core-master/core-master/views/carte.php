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

        <div id="titre">
            <h1>(ノ・∀・)ノ Explorons les villes de France ! 」(￣▽￣」)</h1>
            <h2>Cherche une ville que tu veux montrer sur la carte !</h2>
        </div>
        
        <div id="form">
            <form>
                <p>Choisis une méthode de recherche : </p>
                <select name="methode" v-model="methode" @change="autocomplete">
                    <option value="commence"> commence par </option>
                    <option value="contient"> contient </option>
                    <option value="fini"> fini par </option>
                </select>

            </form>

            
            <form>
                <input 
                type="text"
                v-model="locaSaisie" 
                @input = "autocomplete"
                placeholder = "Expression à chercher"
                >
            </form>

            <form action="/boutonspeciaux">
                <p>Boutons de recherche prédéfinis : </p>
                <button type="submit" name="filtre" value="sainte">Commence par Sainte</button>
                <button type="submit" name="filtre" value="esse">Fini par esse</button>
            </form>
        </div>


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

    <div id="foot">
        <p> © Une création de Lisa Verrier </p> 
    </div>


</body>
</html>