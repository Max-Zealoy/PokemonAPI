'use strict'


const fetchOption = {
	headers: {
		'Content-Type' : 'application/json'
	},
	mode: 'cors'
};

$('form').on('submit', function(e){

    e.preventDefault();

    let types =$('input[type=text]').val().replace(/\s/g,'');
    types = types.split(',');

    let trainerTypeCalls = types.map( elem => {
        return fetch (`https://pokeapi.co/api/v2/type/${elem}/`, fetchOption);
    });

    getPromiseData(trainerTypeCalls)
    .then((result) => {
        console.log(result);
        getBattlePokemon(result)
    
});
});


function getBattlePokemon(pokemonTypes){

    pokemonTypes = pokemonTypes     
    .map (types => {
        return types.damage_relations.double_damage_from //Hämtar från konsol 2 parametrar
    })

    .reduce(flatten, [])
    .map (type => {
        return fetch(type.url, fetchOption)
    });


    getPromiseData(pokemonTypes)
    .then(results => {
        console.log(results);
        ChooseTeam(results)

    });
}


function ChooseTeam(pokemons){
    let team = [];
    pokemons = pokemons.map( pokemon => {
        return pokemon.pokemon;
    })
    .reduce(flatten, [])
    .map( pokemon => pokemon.pokemon );

	for(let i = 0; i < 6; i++) {
		team.push( getRandomPokemon(pokemons) );
	}

	team = team.map(pokemon =>  {
		return fetch(pokemon.url,fetchOption);
	});

	getPromiseData(team)
		.then(pokemonData => {
			showPokemon(pokemonData);
		});
}
  
function getRandomPokemon(pokemonArray) {
	return pokemonArray[ Math.floor(Math.random() * pokemonArray.length) ]; //Random pokemon
}

const flatten = (a,b) => [...a,...b];


function getPromiseData(promisesArray){
    return new Promise((resolve,reject) => {
        Promise.all(promisesArray)
        .then(res => {
            return res.map(type => type.json());
            
        })
        .then(res => {
            Promise.all(res)
            .then(resolve);

        })
        .catch(reject);
       
    });
}






function showPokemon(pokemon) {
	// loop through and display the pokemon!
	pokemon.forEach( poke => {
     var $container = $('<div>').addClass('pokemon');
     var $image = $('<img>').attr('src',`https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`);
     var $title = $('<h2>').text(poke.name);
     $container.append($image,$title);
     $('.teamContainer').append($container);
});
}


//Music script  https://pokeres.bastionbot.org/images/pokemon/${pokeID}

var audio = new Audio("./musik/pokemon.mp3 ");
var audio2 = new Audio("./musik/pokemonRemake.mp3 ");
var audio3 = new Audio("./musik/pokemonJapanese.mp3 ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }