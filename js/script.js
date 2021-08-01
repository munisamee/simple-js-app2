let pokemonList = [
{
    name: "bulbasaur", 
    height: "7", 
    type: ["grass", "poison"],
},

{
    name: "pidgey", 
    height: "3", 
    type: ["flying", "normal"],
},

{
    name: "pikachu", 
    height: "4", 
    type: "electric",
}
]

/** Here add for loop for all pokemons! */

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 10) {
        document.write(pokemonList[i].name + "Bulbasaur (height: 7)", "<br");
        console.log(pokemonList[i].name + " Wow that's big")
    }else if (pokemonList[i].height < 6) {
        document.write(pokemonList[i].name + "Pidgey (height: 3)", "<br>");
    }else {
        document.write(pokemonList[i].name + "Pikachu (height: 4)", "<br>");
    }
}