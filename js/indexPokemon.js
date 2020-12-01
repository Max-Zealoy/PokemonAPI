const pokedex = document.getElementById("pokedex");
const cachedPokemon = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((data, index) => ({
    name: data.name,
    id: index + 1,
    //https://pokemontcg.io/sets //sets
   // `https://images.pokemontcg.io/base1/${pokeID}.png
   image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    image: `https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`,

}));



  /* image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ andra bilder
    }.png`*/

  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon.map((pokeman) =>
        `
        <div class="outerboxitems">
        <div class="boxitems">
        <div class="card">
        <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>

    </div>
    </div>
    </div>
        `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  if (!cachedPokemon[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    cachedPokemon[id] = pokeman;
    displayPokemanPopup(pokeman);
  } else {
    displayPokemanPopup(cachedPokemon[id]);
  }
};

const displayPokemanPopup = (pokeman) => {
  console.log(pokeman);
  const type = pokeman.types.map((type) => type.type.name).join(", ");
  const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()"><p class="close">Close</button></p>
            
            <div class="outerboxitemsecond">
            <div class="boxitemssecond">
              
               
                <h2 class="card-title-click">${pokeman.name}</h2>
                <img class="card-image" src="${pokeman.sprites["front_default"]}"/>
                <p class="card-type">Type: ${type}</p>
                <p class="card-measure">Height: ${pokeman.height} | Weight: ${pokeman.weight}</p>
               
                <li class="card" onclick="abilityPokemon(${pokeman.abilities[0].ability.name})">
                <p class="card-ability">Ability:${pokeman.abilities[0].ability.name}</p>
               </li>
                </div>
                </div>
        </div>
    `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

//get them all! 
fetchPokemon();

// Sroll to top

function scrollToTop() { 
    window.scrollTo(0, 0, 'slow'); 
} 


/* Ska bygga vidare nedan

const abilityPokemon = async (id) => {
    if (!cachedPokemon[id]) {
      const url = `https://pokeapi.co/api/v2/pokemon/${ability}`;
      const res = await fetch(url);
      const pokeman = await res.json();
      cachedPokemon[id] = pokeman;
      displayPokemanPopup(pokeman);
    } else {
      displayPokemanPopup(cachedPokemon[id]);
    }
  };
  
  const displayPokemanPopupp = () => {
    const ability = pokeman.abilities.map((ability) => ability.ability.name).join(", ");
    const htmlStringSecond = `
          <div class="popup">
              <button id="closeBtn" onclick="closePopup()"><p class="close">Close</button></p>
              
              <div class="outerboxitemsecond">
              <div class="boxitemssecond">
                
                 
                  <h2 class="card-title-click">${pokeman.abilities[0].ability.name}</h2>
                  <img class="card-image" src="${pokeman.sprites["front_default"]}"/>
                  <p class="card-type">Type: ${ability}</p>
                  <p class="card-measure">Height: ${pokeman.abilities[0].ability.name.effect_entries.effect} | Weight: ${pokeman.weight}</p>
                  <li class="card" onclick="selectPokemon(${pokeman.effect_entries.effect})">
                  <p class="card-ability" onclick="abilityPokemon">Ability:${pokeman.abilities[0].ability.name}</p>
                 
                  </div>
                  </div>
          </div>
      `;
    pokedex.innerHTML = htmlStringSecond + pokedex.innerHTML;
  };
  
*/



// https://pokeapi.co/api/v2/ability/{id} abilities


//{"abilities":[{"ability":{"name":"overgrow","url":"https://pokeapi.co/api/v2/ability/65/"},
//"is_hidden":false,"slot":1},
//{"ability":{"name":"chlorophyll","url":"https://pokeapi.co/api/v2/ability/34/"}


//{"effect_changes":[],"effect_entries":[{"effect":"When this 