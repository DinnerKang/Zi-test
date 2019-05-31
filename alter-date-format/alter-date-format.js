

expect(timeIncrease('PM 01:00:00', 10)).toBe('13:00:10');
expect(timeIncrease('PM 11:59:59', 1)).toBe('00:00:00');
expect(timeIncrease('AM 12:10:00', 40)).toBe('00:10:40');
expect(timeIncrease('AM 05:24:03', 102392)).toBe('09:50:35');


expect(timeIncrease('AM 05:00:00', 72000)).toBe('01:00:00');
expect(timeIncrease('AM 05:00:00', 108000)).toBe('11:00:00');
expect(timeIncrease('AM 11:00:00', 90000)).toBe('12:00:00');
expect(timeIncrease('PM 11:00:00', 90000)).toBe('00:00:00');
expect(timeIncrease('PM 123', 90000)).toBe('00:00:00');
expect(timeIncrease('PM 11:00:00', 'PM 11:00:00')).toBe('00:00:00');

function timeIncrease(nowDate, n){ 
    console.log('들어온 시간 :',nowDate);
    if(nowDate.split('').length !== 11 ||typeof(n) !== 'number'){
        throw new Error(`입력값이 이상합니다 nowDate : ${nowDate} n : ${n}`);
    }
    let result;
    const day = nowDate.slice(0,2);
    const time = nowDate.substr(3).split(':');
    const getHours = time[0] * 60 * 60;
    const getMinutes = time[1] * 60;
    const getSeconds = Number(time[2]);

    const timeSum = getHours + getMinutes + getSeconds + n;


    let hours   = Math.floor(timeSum / 3600);
    let minutes = Math.floor((timeSum - (hours * 3600)) / 60);
    let seconds = timeSum - (hours * 3600) - (minutes * 60);

    if(day == 'AM' && hours == 12) hours = hours - 12;
    if(day == 'PM') hours = hours + 12;
    
    while(hours >=24){
        hours = hours-24;
    }

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    result = hours + ':' + minutes + ':' +seconds;
    return result;
}


function expect(result) {
    return{
        toBe : function(expected){
            if( result != expected ){
                throw new Error(`결과값 : ${result} 예상값 : ${expected}`);
            }else{
                console.log(`테스트 성공 : ${expected}`);
            }
        }
    }
}
