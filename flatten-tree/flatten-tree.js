

const categories = require('./categories.json');

console.log(categories);

const getTree = (obj) =>{
    let result = [];
    
    const firstKey = Object.keys(obj);
    console.log(firstKey);
    for(let i=0, len_1=firstKey.length; i<len_1; i++){
        const secondCategories = obj[firstKey[i]];
        const secondKey = Object.keys(secondCategories);

        for(let j=0,len_2=secondKey.length; j<len_2;j++){
            let str = "";
            const thirdCategories = secondCategories[secondKey[j]];
            const thirdNode =  Object.keys(thirdCategories);
            str += firstKey[i] + ' > ' + secondKey[i] + ' > ' + thirdNode[i];
            result.push(str);
        }
    }

    console.log(result);
}

getTree(categories);