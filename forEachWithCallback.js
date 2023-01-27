function forEachWithCallback(callback) {
    const arrayCopy = this;
    let index = 0;
    const next = () => {
        index++;
        if (arrayCopy.length > 0) {
            callback(arrayCopy.shift(), index, next);
        }
    }
    next();
}

Array.prototype.forEachWithCallback = forEachWithCallback;

const array = [1, 2, 3, 4, 5];

array.forEachWithCallback((el, i, next) => {
    setTimeout(() => {
        console.log(el);
        next();
    }, 1000);
});



// With Promises
array.forEachWithCallback((el, i, next) => {
    request({
        method: 'GET',
        hostname: 'httpbin.org',
        path: '/get?myArg=' + el
    }).then((res) => {
        const responseBody = JSON.parse(res.body);
        console.log(responseBody.args.myArg);
        next();
    }).catch((err) => {
        console.error(err);
    });
});




//Map
const Fruits = [
    {fruitId: 'abc', name: 'apple'},
    {fruitId: 'abc', name: 'orange'},
    {fruitId: 'def', name: 'mango'},
    {fruitId: 'egt', name: 'pineapple'}
  ]

  const Juices = [
    {juiceId: 'abc', customer: 'John'},
    {juiceId: 'def', customer: 'Gaby'}
  ]

  let finalArray = []
  Juices.map((juice) => {
    Fruits.map((fruit) => {
      if(juice.juiceId === fruit.fruitId){
        finalArray.push({customer: juice.customer, fruit: fruit.name}) 
      }
    });
  });
