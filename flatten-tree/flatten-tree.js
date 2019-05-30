


expect(jsonPath('./categories.json'), 130);
expect(jsonPath('./test-no-oneNode.json'), 129);
expect(jsonPath('./test1.json'), 126);

// 결과의 총 노드 개수와 알고있는 노드의 총 개수 비교
async function expect(result, expected) {
    const res = await result;
    if( res.length != expected ){
        throw new Error(`${res.length} is not equal to ${expected}`);
    }else{
        console.log('테스트 성공');
    }
}

async function jsonPath(path){
    try{
        const res = await axios.get(path);
        return getTree(res.data);
    }catch(e){
        console.log(e);
    }
}

const getTree = (categories) => {

    const result = [];
    const firstKey = Object.keys(categories);
    let str, str_2, str_3;
    let secondCategories, thirdCategories;
    let secondKey, thirdKey;

    for(let a=0, lengthOfFirst=firstKey.length; a<lengthOfFirst; a++){
        str = firstKey[a];
        secondCategories = categories[firstKey[a]];
        secondKey = Object.keys(secondCategories);
        
        if(!secondKey[0]) result.push(str);
        
        for(let i=0, lengthOfSecond=secondKey.length;i<lengthOfSecond; i++){
            str_2 = str + ' > ' + secondKey[i];
            thirdCategories = secondCategories[secondKey[i]];
            thirdKey = Object.keys(thirdCategories);

            if(!thirdKey[0]) result.push(str_2);
            
            for(let j=0, lengthOfThird=thirdKey.length; j<lengthOfThird; j++){
                str_3 = str_2 + ' > ' + thirdKey[j];
                result.push(str_3);
            }
        }
    }
    console.log('결과 : ',result);
    return result;
}
