/*
var datasets_in_dictionary={
    dataset2: ['A','B','C','D','E'],
    dataset3: ['A','B','AA','BB','CC','DD','EE'],
    dataset4: ['A','B','BBB','DDD','C'],
    }
var attributes_from_union=['A','B','C','D','E','AA','BB','CC','DD','EE','BBB','DDD'];
*/
//------------------------------------------------------------------------------------------------------ Matrix generator starts here
export function test(d){
return d;
}
export function matrixgen(attributes_from_union,datasets_in_dictionary){
var datasets=[];
var matrix=new Array(Object.keys(datasets_in_dictionary).length);
var count=0;
for (var combinations_key in datasets_in_dictionary){
    datasets.push(combinations_key);
    matrix[count]=new Array(attributes_from_union.length);
    for(var combination_index=0;combination_index<attributes_from_union.length;combination_index++){
        for(var j=0;j<datasets_in_dictionary[combinations_key].length;j++){
            if(attributes_from_union[combination_index]==datasets_in_dictionary[combinations_key][j]){
            matrix[count][combination_index]=1;
        }
        else{
            if(!matrix[count][combination_index]==1){
                matrix[count][combination_index]='n';
            }
        }
    }
}
count++;
}
/* This is how the matrix looks like
0: (6) [1, 1, 1, "n", "n", "n"]
1: (6) [1, 1, 1, "n", "n", "n"]
2: (6) [1, 1, 1, "n", "n", "n"]
3: (6) [1, "n", 1, "n", 1, "n"]
4: (6) [1, "n", 1, "n", 1, "n"]
5: (6) [1, "n", 1, "n", 1, "n"]
6: (6) [1, 1, "n", 1, "n", "n"]
7: (6) [1, 1, "n", 1, "n", "n"]
8: (6) [1, 1, "n", 1, "n", "n"]
9: (6) ["n", 1, "n", 1, "n", 1]
1: (6) ["n", 1, "n", 1, "n", 1]
1: (6) ["n", 1, "n", 1, "n", 1]
*/
//console.log(matrix)
return {'datasets':datasets,'matrix':matrix}
}
//------------------------------------------------------------------------------------------------------ Second Matrix generator starts here
export function second_matrix_with_datasets(datasets,matrix){
    //console.log("From secondMatrix",matrix)
    var mymatrix=matrix.slice();
    // The parameters are dataset array and matrix array.
    var newMatrix=[datasets,mymatrix];
    var len=newMatrix[1][1].length;
    for(var i=0;i<newMatrix[0].length;i++){
        for(var j=0;j<len;j++){
            if(newMatrix[1][i][j]==1){
                newMatrix[1][i][j]=j;
            }
/*
            else{
                if(newMatrix[1][i][j]=='00'){
                    newMatrix[1][i][j]='n';
                }                
            }
*/
        }
    }
return newMatrix;
// returns 2D array where the second array contains the matrix and the first array contains datasets
/*
0: "./upload/01_d1"
1: "./upload/02_d11"
2: "./upload/03_d111"
3: "./upload/04_d2"
4: "./upload/05_d22"
5: "./upload/06_d222"
6: "./upload/07_d3"
7: "./upload/08_d33"
8: "./upload/09_d333"
9: "./upload/10_d4"
10: "./upload/11_d44"
11: "./upload/12_d444"
-------------------------------
0: (6) [0, 1, 2, "n", "n", "n"]
1: (6) [0, 1, 2, "n", "n", "n"]
2: (6) [0, 1, 2, "n", "n", "n"]
3: (6) [0, "n", 2, "n", 4, "n"]
4: (6) [0, "n", 2, "n", 4, "n"]
5: (6) [0, "n", 2, "n", 4, "n"]
6: (6) [0, 1, "n", 3, "n", "n"]
7: (6) [0, 1, "n", 3, "n", "n"]
8: (6) [0, 1, "n", 3, "n", "n"]
9: (6) ["n", 1, "n", 3, "n", 5]
1: (6) ["n", 1, "n", 3, "n", 5]
1: (6) ["n", 1, "n", 3, "n", 5]
*/
}
//------------------------------------------------------------------------------------------------------  Combination generator2 starts here
export function combinationgen2(array){
    var combdict=[];
     function fork(i, t) {
         if (i === array.length) {
             result.push(t);
             return;
         }
         fork(i + 1, t.concat([array[i]]));
         fork(i + 1, t);
     }
     var result = [];
     fork(0, []);
     for(var i=0;i<result.length;i++){
         if(result[i].length>0){
             combdict.push(result[i])
         }
     }
     return combdict;
/* This is generated for the item selected at index 0,2,5; 2^3-1=7 combinations
0: (3) [0, 2, 5]
1: (2) [0, 2]
2: (2) [0, 5]
3: [0]
4: (2) [2, 5]
5: [2]
6: [5]
*/
    }
//------------------------------------------------------------------------------------------------------ Comobination matched starts here
export function combination_matched(matrix,datasets,combination){
    var combinations_with_mathced_datasets=[];
    var len=combination.length-1;
    for (var combination_index=len;combination_index>=0;combination_index--){
            for(var combinations_key in combination[combination_index]){
                var count=0;
                for(var combinations_dictionary_iterator=0;combinations_dictionary_iterator<combination[combination_index][combinations_key].length;combinations_dictionary_iterator++){
                    //console.log("----");  
                    count++;
                    for(var fi=0;fi<datasets.length;fi++){
                    if(matrix[fi][combination[combination_index][combinations_key][combinations_dictionary_iterator]]){
                        //console.log(combination[combination_index][combinations_key],datasets[fi],combination[combination_index][combinations_key].length,count);
                        if(count==combination[combination_index][combinations_key].length){
                            combinations_with_mathced_datasets.push({[count]:combination[combination_index][combinations_key],'Dataset':datasets[fi]})
                            //console.log(combination[combination_index][combinations_key],datasets[fi],combination[combination_index][combinations_key].length,count);
                        }
                    }   
                }
            }
        }
    }
console.log(combinations_with_mathced_datasets)
return combinations_with_mathced_datasets;      
}
//var combination=combinationgen2([0,1,2]);
//var matrixgen=matrixgen(attributes_from_union,datasets_in_dictionary);
//console.log(combination_matched(matrixgen['matrix'],matrixgen['datasets']),combination);
//------------------------------------------------------------------------------------------------------ Dataset grouping_based_on_combination starts here
export function grouping_based_on_combination(combinations,combinationmatched){
    //console.log('Combinations : ',combinations);
    //console.log('Combination matched : ',combinationmatched);
    var len=combinations.length-1;
    var group =0;
    var arr_group=[];
    for (var combination_index=len;combination_index>=0;combination_index--){
        var arr=[];
        for(var combinations_key in combinations[combination_index]){
            for(var combination_mathced_iterator=0;combination_mathced_iterator<combinationmatched.length;combination_mathced_iterator++){
                for(var key_in_combination_mathced in combinationmatched[combination_mathced_iterator]){
                    if(JSON.stringify(combinations[combination_index][combinations_key])== JSON.stringify(combinationmatched[combination_mathced_iterator][key_in_combination_mathced])){
                        arr.push(combinationmatched[combination_mathced_iterator]['Dataset']);
                    }
                }
            }
            arr_group.push({[group]:arr,'dataset':arr,'attributes_index':combinations[combination_index][combinations_key],'occurence':combinations[combination_index][combinations_key].length,'number_of_dataset':arr.length})
            }
            group++;
        }
        //console.log(arr_group)
    return arr_group;
    }
//--Function to check if an array contains another array
// This function is used only by Datasetgrouper and subset remover
export function arrayContainsArray (superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

//------------------------------------------------------------------------------------------------------ DatasetGrouper starts here
export function dataset_grouper(datasets,matrix,combinations){
    const secondMatrix=second_matrix_with_datasets(datasets,matrix)
    //console.log("From datasetGrouper",matrix)
    // secondMatrix[1] has the arrays with combinations set to their respective index
    var return_Array=new Array(combinations.length);
    var count=0;
    for(var i=0; i<combinations.length;i++){
        var arr=[[],[]];
        arr[0]=combinations[i]
        for(var j=0;j<secondMatrix[1].length;j++){
            if(arrayContainsArray(secondMatrix[1][j],combinations[i])){
               arr[1].push(secondMatrix[0][j]); 
                //console.log(combinations[i],secondMatrix[0][j])
            }
        }
        return_Array[count]=arr;
        count++;
    }
    //console.log(return_Array);
    //return return_Array;
   return subsetRemover(return_Array);
}
//------------------------------------------------------------------------------------------------------ subsetRemover
export function subsetRemover(grouped_datasets){
/* grouped data set is in the following format where first index contains the attribute index and second index contains datasets
0: (2) [Array(2), Array(6)]
1: (2) [Array(1), Array(9)]
2: (2) [Array(1), Array(6)]
*/
    var subsetRemovedArray = grouped_datasets;
    var return_Array=[];
    var len=subsetRemovedArray.length;
    for(var i=0;i<len;i++){
        for(var j=i+1;j<len;j++){
            if(typeof subsetRemovedArray[j] !== 'undefined' & typeof subsetRemovedArray[i] !== 'undefined'){
            if((JSON.stringify(subsetRemovedArray[i][1])) === JSON.stringify(subsetRemovedArray[j][1])){
                delete subsetRemovedArray[j];
            }
            else if (arrayContainsArray(subsetRemovedArray[i][1],subsetRemovedArray[j][1])){
                delete subsetRemovedArray[j];
            }
            else if (arrayContainsArray(subsetRemovedArray[j][1],subsetRemovedArray[i][1])){
                delete subsetRemovedArray[i];
            }
        }
    } 
}
    for(var i=0;i<subsetRemovedArray.length;i++){
        if(typeof subsetRemovedArray[i] !== 'undefined'){
            if(subsetRemovedArray[i].length>0){
                return_Array.push(subsetRemovedArray[i]);
            }
        }
}
return duplicate_remover(return_Array)
//console.log(return_Array)
//return return_Array;
}
//------------------------------------------------------------------------------------------------------ Duplicate remover start here
export function duplicate_remover(array_dataset2){
//console.log(array_dataset2)
var array_dataset=[];
/* array index 0 is not important here; Index 1 contains datasets; check them and make two unique groups;
0: (2) [Array(1), Array(9)]
1: (2) [Array(1), Array(9)]
*/
var arr=[]
// Convert javascript Array to Object
for(var i=0;i<array_dataset2.length;i++){
    arr.push(Object.assign({}, array_dataset2[i][1]));
    //console.log(array_dataset2[i][1])
}
//------------- iterate and delete duplicates
/*
one loop loops through the first object container and then another loop loops ever object from the beginning to the end but skips itself(i!=j)
*/
for(var i=0;i<arr.length-1;i++){
        for (var key1 in arr[i]) {
            if (arr[i].hasOwnProperty(key1)) {
                for(var j=0;j<arr.length;j++){
                    if(i!=j){
                            for (var key2 in arr[j]) {
                                if (arr[j].hasOwnProperty(key2)) {
                                    if(arr[i][key1]==arr[j][key2]){
                                    //console.log(arr[i+1][key2])
                                    delete arr[j][key2];
                                }
                                else{
                                    //console.log(arr[i][key1],key1,arr[j][key2],key2)
                                }
                            }
                        }
                }
            }
        }
    }
}
// Convert javascript object to an Array
var return_Array=[];
for(var i=0;i<arr.length;i++){
    var result = Object.keys(arr[i]).map(function(key) {
        return arr[i][key];
    });
    if(result.length!=0){
        array_dataset.push(result);
    }
    else{
        console.log("Zero...",result)  
    }
}
console.log(array_dataset)
return array_dataset;

}