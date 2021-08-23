/** Add new pokemon repository here */

let pokemonRepository = (function() {
    let pokemonList = [
            {
                name: "bulbasaur", 
                height: "0.7", 
                type: ["grass", "poison"],
            },
            
            {
                name: "pidgey", 
                height: "1.7", 
                type: ["flying", "normal"],
            },
            
            {
                name: "pikachu", 
                height: "44", 
                type: "electric",
            }
        ];

        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function add(pokemon) {
            if (
                typeof pokemon === "object" &&
                "name" in pokemon &&
                "height" in pokemon &&
                "types" in pokemon
            ) {
                pokemonList.push(pokemon);
            }else {
                console.log("pokemon is not correct");
            }
        }
    
        function getAll(pokemon) {
            return pokemonList;
        }

        /** Here add addListItem */

        function addListItem(pokemon) {
            let pokemonList = document.querySelector (".pokemon-list");
            let listpokemon = document.createElement("li");
            let button = document.createElement("button");
            button.addEventListener('click', function 
            (event) {
                let target = event.target;
                let showDetails = pokemon;
                let button = document.querySelector('button');
            });
            button.innerText = pokemon.name;
            button.classList.add("button-class");
            listpokemon.appendChild(button);
            pokemonList.appendChild(listpokemon);
        }

        /**Function LoadList here */

        function loadList() {
            return fetch(apiURl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.result.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        }

        /** Here add showDetails function */
        function showDetails (pokemon) {
            loadDetails(pokemon).then(function () {
                console.log(pokemon);
            });
        }
            
        
    
        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList
        };
    })();
    

    console.log(pokemonRepository.getAll());
    pokemonRepository.add({name: "Jigglypuff", height: "1.08", type: ["steel"] });

/** Here add forEach instead of for loop for all pokemons! */

console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
   });
});
















