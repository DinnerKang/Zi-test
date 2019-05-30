import axios from 'axios';


exports.endPoint = axios.create({
    baseURL : 'http://test.recruit.croquis.com:28500/',
    headers : {
        'Content-Type' : 'application/json',
        'Croquis-UUID' : '00000000-0000-0000-0000-000000000000'
    }
});