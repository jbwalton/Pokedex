let pokemonList = [];
pokemonList.push({name:'Bulbasaur',height:.7,type:['grass','poison']});
pokemonList.push({name:'Caterpie',height:.3,type:['bug']});
pokemonList.push({name:'Rattata',height:.3,type:['normal']});
pokemonList.push({name:'Sandslash',height:1,type:['ground']});
pokemonList.push({name:'Vulpix',height:.6,type:['fire']});
pokemonList.push({name:'Paras',height:.3,type:['grass','bug']});
pokemonList.push({name:'Golduck',height:1.7,type:['water']});
// to access the array elements in each object in the array use syntax console.log(pokemonList[0].type[1]);   which returns the value 'poison'

for (let i=0; i<=pokemonList.length; i++){
  document.write(pokemonList[i].name+" (height: "+pokemonList[i].height+") ");
  if (pokemonList[i].height >=.7) {
    document.write(" - Wow, that's big <br>");
  }else{
      document.write("<br>");
    }
  }
