<?php

declare(strict_types=1);
require_once 'flight/Flight.php';
// require 'flight/autoload.php'

//SQL
    $link = mysqli_connect('u2.ensg.eu', 'geo', '', 'geobase');
    
    mysqli_set_charset($link, "utf8");

    // stocker une variable globale
    Flight::set('link', $link);

//ROUTES

//URL de la page d'acceuil
Flight::route('/', function () {
    Flight::render('carte');
});

//route d'API ?
Flight::route('/rechercheLoca', function () {
    $link = Flight::get('link');

    $saisie =  $_GET['locaSaisie'];

    $donnees = [];

    if ($saisie != ''){

        $results = mysqli_query (
                $link,
                    'SELECT nom, insee
                    FROM geobase.communes
                    WHERE nom LIKE "'.$saisie. '%"
                    LIMIT 10'
            );
            foreach ($results as $result){
                $donnees[] = $result;
            };
    };

    Flight::json($donnees);
});

Flight::route('/test', function (){
    Flight::render('test');
});

//CA FAIT TOUT MARCHER, LE SUPPRIME PAS
Flight::start();
