
let categories;

const getData = async () => {
    const res = await axios.get('./categories.json');
    categories = res.data;
    getTreeView(categories);
}
getData();


const getTreeView = (obj) => {
    let result = [];

    const firstKey = Object.keys(obj);

    for(let a=0, lengthOfFirst=firstKey.length; a<lengthOfFirst; a++){
        let str = firstKey[a];
        const secondCategories = obj[firstKey[a]];
        const secondKey = Object.keys(secondCategories);

        for(let i=0, lengthOfSecond=secondKey.length;i<lengthOfSecond; i++){
            if (secondKey[i]) {
                let str_2 = str + ' > ' + secondKey[i];
    
                const thirdCategories = secondCategories[secondKey[i]];
                const thirdKey = Object.keys(thirdCategories);
                if(!thirdKey[i])  result.push(str_2);
                for(let j=0, lengthOfThird=thirdKey.length; j<lengthOfThird; j++){
                    let str_3 = str_2 + ' > ' + thirdKey[j];
                    result.push(str_3);
                }
            }
        }
    }

    
    
    
    
    console.log(result);
}
