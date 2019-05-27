


// 테스트 시 데이터 경로 추가
getData('./categories.json');


async function getData(path){
    try{
        const res = await axios.get(path);
        getTreeView(res.data);
    }catch(e){
        alert('서버에서 실행시켜야 합니다.');
    }
}

const getTreeView = (categories) => {

    const result = [];
    const firstKey = Object.keys(categories);
    let str, str_2, str_3;
    let secondCategories, thirdCategories;
    let secondKey, thirdKey;


    for(let a=0, lengthOfFirst=firstKey.length; a<lengthOfFirst; a++){
        str = firstKey[a];
        secondCategories = categories[firstKey[a]];
        secondKey = Object.keys(secondCategories);


        if(!secondKey[0])  result.push(str);


        for(let i=0, lengthOfSecond=secondKey.length;i<lengthOfSecond; i++){
            str_2 = str + ' > ' + secondKey[i];
            thirdCategories = secondCategories[secondKey[i]];
            thirdKey = Object.keys(thirdCategories);


            if(!thirdKey[0])  result.push(str_2);

            
            for(let j=0, lengthOfThird=thirdKey.length; j<lengthOfThird; j++){
                str_3 = str_2 + ' > ' + thirdKey[j];
                result.push(str_3);
            }
        }
    }
    console.log('결과 : ',result);
    return result;
}

