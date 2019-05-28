


// 테스트 시 데이터 경로 추가
//getData('./categories.json');

expect(getData('./categories.json'), 130);

// 테스트 함수
// 
async function expect(result, expected) {
    const res = await result;
    if( res.length != expected ){
        throw new Error(`${res.length} is not equal to ${expected}`);
    }else{
        console.log('테스트 성공');
    }
}



async function getData(path){
    try{
        const res = await axios.get(path);
        return getTreeView(res.data);
    }catch(e){
        console.log(e);
    }
}

const getTreeView = (categories) => {

    const result = [];
    const firstKey = Object.keys(categories);
    let str, str_2, str_3;
    let secondCategories, thirdCategories;
    let secondKey, thirdKey;
    let oneNode = 0, twoNode = 0, threeNode =0;

    for(let a=0, lengthOfFirst=firstKey.length; a<lengthOfFirst; a++){
        str = firstKey[a];
        secondCategories = categories[firstKey[a]];
        secondKey = Object.keys(secondCategories);
        

        if(!secondKey[0])  {
            result.push(str);
            oneNode += 1;
        }

        for(let i=0, lengthOfSecond=secondKey.length;i<lengthOfSecond; i++){
            str_2 = str + ' > ' + secondKey[i];
            thirdCategories = secondCategories[secondKey[i]];
            thirdKey = Object.keys(thirdCategories);


            if(!thirdKey[0])  {
                result.push(str_2);
                twoNode += 1;
            }
            
            for(let j=0, lengthOfThird=thirdKey.length; j<lengthOfThird; j++){
                str_3 = str_2 + ' > ' + thirdKey[j];
                result.push(str_3);
                threeNode += 1;
            }
        }
    }
    console.log('첫번째 노드 갯수 :',oneNode);
    console.log('두번째 노드 갯수 :',twoNode);
    console.log('세번째 노드 갯수 :',threeNode);
    console.log('결과 : ',result);
    return result;
}
