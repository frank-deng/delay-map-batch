delay-map-batch
===============

Enumerate array by batch, there will be a delay in milliseconds before processing the next batch.

Installation
------------

Node

	var DelayMapBatch = require('delay-map-batch');

Browser

	<script type='text/javascript' src='delay-map-batch.min.js'></script>


Usage
-----

	DelayMapBatch([1,2,3,4,5], (n, index)=>{
		//Do some stuff
		console.log(n);
	}, {
		batchSize: 1000,
	}).then(()=>{
		//Mapping finished
	});

With 2s delay between batches:

	DelayMapBatch([1,2,3,4,5], (n, index)=>{
		//Do some stuff
		console.log(n);
	}, {
		batchSize: 1000,
		delay: 2000,
	}).then(()=>{
		//Mapping finished
	});


API Documentation
-----------------

### `DelayMapBatch(array, mapFunction, [params])`

Parameters

* `array`: The array to be enumerated.
* `mapFunction`: The function called for each element of the array, accept 2 parameters, first is the element enumerated, second is the index of the element in the array.
* `params`: Parameters for enumerating array.

Returns

A `Promise()` object, you can use `then()` to add functions to be executed after enumeration finished, or add `catch()` to catch exceptions when there is anything thrown from the map function.

Tests
-----

Run `npm test` to run the test cases.

