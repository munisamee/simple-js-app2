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

pokemonList.forEach(function(pokemon) {
    console.log(pokemonList[i].name + ' is' + pokemonList[i].height + ' inch' + pokemonList[i].type + ' ');
});

if (pokemonList[i].height > 10) {
    document.write(
        pokemonList[i].name + "Bulbasaur (height: 7) Wow that's big", 
        "<br"
        );
}else if (pokemonList[i].height < 6) {
    document.write(pokemonList[i].name + "Pidgey (height: 3)", "<br>");
}else {
    document.write(pokemonList[i].name + "Pikachu (height: 4)", "<br>");
}

(function() {
    console.log(pokemonList);
}());









