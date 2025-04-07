function CallbackFun(){
    // 콜백 함수

    // forEach() : 배열을 콜백 
    const numbers = [35,67,190,3,90];
    numbers.forEach((v,i) => console.log(`${i}번째 요소 :${v}`))

    let arrMap = numbers.map(function(value,index){
        return value * index ; 
    })
    
    arrMap.forEach(console.log);

}