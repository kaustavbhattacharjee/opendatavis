var datasets_in_dictionary={
    dataset2: ['A1','B1','C1','D1','E1'],
    dataset3: ['AA','BB','C','DD','EE'],
    dataset4: ['A','B','BBB','DDD','C5'],
    dataset5: ['A','B','C','D5','CC'],
    }
var attributes_from_union=['A','B','C','D','E','AA','BB','CC','DD','EE','BBB','DDD'];
var datasets=matrixgen(attributes_from_union,datasets_in_dictionary)['datasets']
var matrix=matrixgen(attributes_from_union,datasets_in_dictionary)['matrix']
//console.log(datasets);
var combinations=combinationgen([0,1,5])
//console.log(combinations);
var secondMatrix = second_matrix_with_datasets(datasets,matrix);
//------------------------------------------------------------------------------------------------------ Matrix generator starts here
 function matrixgen(attributes_from_union,datasets_in_dictionary){
        //console.log(datasets_in_dictionary)
    var datasets=[];
    //var size=Object.keys(datasets_in_dictionary).length;
    var matrix=new Array(Object.keys(datasets_in_dictionary).length);
    var count=0;
    for (var datasets_from_datasets_in_dictionary in datasets_in_dictionary){
        //console.log('Combination key', datasets_from_datasets_in_dictionary);
        datasets.push(datasets_from_datasets_in_dictionary);
        matrix[count]=new Array(attributes_from_union.length);
        for(var combination_index=0;combination_index<attributes_from_union.length;combination_index++){
            for(var j=0;j<datasets_in_dictionary[datasets_from_datasets_in_dictionary].length;j++){
                if(attributes_from_union[combination_index]==datasets_in_dictionary[datasets_from_datasets_in_dictionary][j]){
               //console.log(matrix[count]);
                matrix[count][combination_index]=1;
                }
            else{
                //matrix[count][combination_index]='n';
                if(!matrix[count][combination_index]==1){
                    matrix[count][combination_index]=0;
                }
            }
        }
    }
    count++;
    }
    return {'datasets':datasets,'matrix':matrix}
    }
    //console.log(matrixgen(attributes_from_union,datasets_in_dictionary))
    //console.log(matrixgen(attributes_from_union,datasets_in_dictionary))
//------------------------------------------------------------------------------------------------------ Second Matrix generator starts here
function second_matrix_with_datasets(datasets,matrix,combinations){
    // The parameters are dataset array and matrix array.
    var newMatrix=[datasets,matrix];
    for(var i=0;i<matrix.length;i++){
        for(var j=0;j<matrix[i].length;j++){
            if(matrix[i][j]==1){
                newMatrix[1][i][j]=j;
            }
            else{
                newMatrix[1][i][j]='n';
            }
        }
    }
return newMatrix;
}
//var datasets_and_secondMatrix = second_matrix_with_datasets(datasets,matrix);
//console.log(datasets_and_secondMatrix[0][0],secondMatrix_datasets[1][0])
//------------------------------------------------------------------------------------------------------  Combination generator starts here
function combinationgen(array){
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
    //console.log('Combination Generator has generated : ',combinationgen([0,2])) 
    //console.log(combinationgen([4,5,0]))
//------------------------------------------------------------------------------------------------------ Function to check if an array contains another array
function arrayContainsArray (superset, subset) {
        if (0 === subset.length) {
          return false;
        }
        return subset.every(function (value) {
            console.log(superset.indexOf(value))
          return (superset.indexOf(value) >= 0);
        });
      }
      
//------------------------------------------------------------------------------------------------------ DatasetGrouper starts here
function dataset_grouper(secondMatrix,combinations){
    // secondMatrix[1] has the arrays with combinations set to their respective index
    var return_Array=new Array(combinations.length);
    var len3=secondMatrix[1].length;
    for(var i=0; i<combinations.length;i++){
        var arr=[[],[]];
        var datasets_Array=[];
        for(var k=0;k<len3;k++){
            var count=0;
            //console.log(combinations[i].length);
            for(j=0;j<combinations[i].length;j++){
                //console.log(combinations[i])
                if(secondMatrix[1][k][j]!='n'){
                    count++;
                 }
            }
            if(count==combinations[i].length){
                datasets_Array.push(secondMatrix[0][k]) 
            }
        }
        arr[0]=combinations[i];
        //console.log(datasets_Array)
        arr[1]=datasets_Array;
        //console.log(arr)
        return_Array.push(arr);
    }
   return subsetRemover(return_Array);
}
//console.log(dataset_grouper(secondMatrix,combinations))
//console.log(secondMatrix)
//------------------------------------------------------------------------------------------------------ subsetRemover
function subsetRemover(grouped_datasets){
        subsetRemovedArray = grouped_datasets;
        return_Array=[];
        var len=subsetRemovedArray.length;
        for(var i=0;i<len;i++){
            for(var j=i+1;j<len;j++){
                if(typeof subsetRemovedArray[j] !== 'undefined' & typeof subsetRemovedArray[i] !== 'undefined'){
                if((JSON.stringify(subsetRemovedArray[i][1])) === JSON.stringify(subsetRemovedArray[j][1])){
                    delete subsetRemovedArray[j];
                }
            else{
                
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
    return return_Array;
}
function repeted_dataset_Remover(grouped_datasets){
    //console.log(grouped_datasets)
    sorted_grouped_datasets = grouped_datasets.sort(function(a,b) {
        return b[1].length - a[1].length;
    });
    console.log(sorted_grouped_datasets)
    for(var i=0;i<sorted_grouped_datasets.length-1;i++){
        for(j=0;j<sorted_grouped_datasets[i+1][1].length;j++){
            if(sorted_grouped_datasets[i][1].includes(sorted_grouped_datasets[i+1][1][j])){
                delete sorted_grouped_datasets[i+1][1][j]
            }
        }
        
    console.log(sorted_grouped_datasets[i][1])
    }
}
var mygrouped_datasets=dataset_grouper(secondMatrix,combinations);

repeted_dataset_Remover(mygrouped_datasets)
//------------------------------------------------------------------------------------------------------ Sorting
//console.log(combinations,dataset_grouper(secondMatrix,combinations))