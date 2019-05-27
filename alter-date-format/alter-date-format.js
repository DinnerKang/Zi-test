

timeIncrease('AM 05:24:03', 102392)

function timeIncrease(nowDate, n){
    console.log(nowDate);
    let result;
    const day = nowDate.slice(0,2);
    const time = nowDate.substr(3).split(':');
    const getHours = time[0] * 60 * 60;
    const getMinutes = time[1] * 60;
    const getSeconds = Number(time[2]);

    const getAllTime = getHours + getMinutes + getSeconds + n;


    var hours   = Math.floor(getAllTime / 3600);
    var minutes = Math.floor((getAllTime - (hours * 3600)) / 60);
    var seconds = getAllTime - (hours * 3600) - (minutes * 60);

    if(day == 'AM' && hours == 12) hours = hours - 12;
    if(day == 'PM') hours = hours + 12;
    
    while(hours >=24){
        hours = hours-24;
    }

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    result = hours + ':' + minutes + ':' +seconds;
    console.log(result);
    return result;
}
