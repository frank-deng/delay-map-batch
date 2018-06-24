const DelayMapBatch = require('./delay-map-batch');

new DelayMapBatch([1,2,3], (n)=>{
	console.log(n);
}).then((status)=>{
	console.log(status);
});
