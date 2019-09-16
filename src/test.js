var items = [1,2,3,4,5];
var copy = [];
var copyString = [];

// for each is used as an alternative of for loop to iterate over an array.
/*
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}
*/
items.forEach(function(item){
  copy.push(item);
});

//if you want to convert or do any kind of operations you can also do that

items.forEach(function(item){
    //String method converts integers to string
    copyString.push(String(item));
  });

var PlayerOne = ['D', 'C', 'A'];
var PlayerTwo = ['D', 'C','A','K'];

if(PlayerTwo.every(val => PlayerOne.includes(val))){
console.log("Yeah");
}
else{
  //console.log("No")
}
console.log(items.indexOf(4))