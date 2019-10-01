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
    //console.log(datasets_in_dictionary)
var datasets=[];
//var size=Object.keys(datasets_in_dictionary).length;
var matrix=new Array(Object.keys(datasets_in_dictionary).length);
var count=0;
for (var combinations_key in datasets_in_dictionary){
    datasets.push(combinations_key);
    matrix[count]=new Array(attributes_from_union.length);
    for(var combination_index=0;combination_index<attributes_from_union.length;combination_index++){
        for(var j=0;j<datasets_in_dictionary[combinations_key].length;j++){
            if(attributes_from_union[combination_index]==datasets_in_dictionary[combinations_key][j]){
           //console.log(matrix[count]);
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
return {'datasets':datasets,'matrix':matrix}
}
//console.log(matrixgen(attributes_from_union,datasets_in_dictionary)['datasets'])
//console.log(datasets,matrix);
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
     }

//------------------------------------------------------------------------------------------------------  Combination generator starts here
export function combinationgen(array){
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
            combdict.push({[result[i].length]:result[i]})
        }
    }
    return combdict;
    }
//console.log('Combination Generator has generated : ',combinationgen([0,2])) 
//console.log(combinationgen([4,5,0]))
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
return combinations_with_mathced_datasets;      
}
//var combination=combinationgen([0,1,2]);
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
// returns 2D array where the second array contains the matrix and the first one datasets
}
//------------------------------------------------------------------------------------------------------ Function to check if an array contains another array
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
   return subsetRemover(return_Array);
}
//------------------------------------------------------------------------------------------------------ subsetRemover
export function subsetRemover(grouped_datasets){
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
duplicate_remover(return_Array)
return return_Array;
}
export function duplicate_remover(array_dataset2){
    var array_dataset=array_dataset2.slice()
//console.log(array_dataset)
//-------------sort the dataset group
  var datasets=[]
  for(var i=0;i<array_dataset.length;i++){
    var tempobj={"attr":array_dataset[i][0],"datset_group":array_dataset[i][1],"group_length":array_dataset[i][1].length}
    datasets.push(tempobj)
  } 
  datasets.sort(function (a, b) {
    return b.group_length - a.group_length;
  });
  //-------------loop through the array starts here
  for(var i=0;i<datasets.length-1;i++){
        for(var j=i+1;j<datasets.length;j++){
            for(var k=0;k<datasets[j].group_length;k++){
                if(datasets[i].datset_group.includes(datasets[j].datset_group[k])){ delete datasets[j].datset_group[k] }
            }
    }
    console.log(datasets)
}

}