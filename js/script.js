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
        function add(pokemon) {
            pokemonList.push(pokemon);
        }
    
        function getAll() {
            return pokemonList;
        }
    
        return {
            add: add,
            getAll: getAll
        };
    })();
    


/** Here add forEach instead of for loop for all pokemons! */

pokemonRepository.add({name: "Jigglypuff", height: "1.08", type: "steel"});
pokemonRepository.getAll().forEach((pokemon) => {
    console.log("pokemon", pokemon);
});








