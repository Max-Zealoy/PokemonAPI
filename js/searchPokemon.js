'use strict'


const fetchOption = {
    headers: {
        'Content-Type' : 'application/json'
       
        
	},
    mode: 'cors',
};

$('form').on('submit', function(e){

    e.preventDefault();

    let types =$('input[type=text]').val().replace(/\s/g,'');
    types = types.split(',');

    
    let trainerTypeCalls = types.map( elem =>
         {
        return fetch (` https://pokeapi.co/api/v2/type/${elem}/`, fetchOption);

    
    //https://pokeapi.co/api/v2/type
    });

    getPromiseData(trainerTypeCalls)
    .then((result) => {
        console.log(result);
        getBattlePokemon(result)

        document.getElementById("myForm").reset(); //tar bor inskrivet input fast inte bilden.
    
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

    $('.teamContainer').empty(); //empty the append so not new pokemon appears, not gonna catch em all :(

	for(let i = 0; i < 3; i++) {
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



	return pokemonArray[ Math.floor(Math.random() *(pokemonArray.length)) ]; //Random pokemon
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
     var $image = $('<img>').attr('src',`https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`); //same as the api use from orignal url
     var $title = $('<h2>').text(poke.name);
     $container.append($image,$title);
     $('.teamContainer').append($container);

   
});
}

//https://assets.pokemon.com/assets/cms2/img/pokedex/detail //fails alot
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/
  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon //same as the api from school
  https://pokeres.bastionbot.org/images/pokemon/${pokeID}

//Music script  /${pokeID}


var audio =  new Audio("./musik/pokemon.mp3 ");
var audio2 = new Audio("./musik/PokemonRemake.mp3 ");
var audio3 = new Audio("./musik/pokemonJapanese.mp3 ");
var audio4 = new Audio("./musik/Pikachu.mp3 ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }





