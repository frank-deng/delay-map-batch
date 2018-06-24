const DelayMapBatch = require('./delay-map-batch');

QUnit.test('Array smaller than batch size', function(assert){
	var done = assert.async(2);

	var array1 = [1,2,3,4,5,6,7], result1 = [];
	new DelayMapBatch(array1, (n)=>{
		result1.push(n);
	}, {
		batchSize: 100,
	}).then((status)=>{
		assert.deepEqual(array1, result1);
		assert.strictEqual(status, true);
		done();
	});

	var array2 = [1,2,3,4,5,6,7,8], result2 = [];
	new DelayMapBatch(array2, (n)=>{
		result2.push(n);
	}, {
		batchSize: 100,
	}).then((status)=>{
		assert.deepEqual(array2, result2);
		assert.strictEqual(status, true);
		done();
	});
});
QUnit.test('Array equal to batch size', function(assert){
	var done = assert.async(4);

	var array1 = [1,2,3,4,5,6,7], result1 = [];
	new DelayMapBatch(array1, (n)=>{
		result1.push(n);
	}, {
		batchSize: 7,
	}).then((status)=>{
		assert.deepEqual(array1, result1);
		assert.strictEqual(status, true);
		done();
	});

	var array2 = [2,3,4,5,6,7,8], result2 = [];
	new DelayMapBatch(array2, (n)=>{
		result2.push(n);
	}, {
		batchSize: 7,
	}).then((status)=>{
		assert.deepEqual(array2, result2);
		assert.strictEqual(status, true);
		done();
	});

	var array3 = [1,2,3,4,5,6,7,8], result3 = [];
	new DelayMapBatch(array3, (n)=>{
		result3.push(n);
	}, {
		batchSize: 8,
	}).then((status)=>{
		assert.deepEqual(array3, result3);
		assert.strictEqual(status, true);
		done();
	});

	var array4 = [1], result4 = [];
	new DelayMapBatch(array4, (n)=>{
		result4.push(n);
	}).then((status)=>{
		assert.deepEqual(array4, result4);
		assert.strictEqual(status, true);
		done();
	});
});
QUnit.test('Array larger than batch size', function(assert){
	var done = assert.async(4);

	var array1 = [1,2,3,4,5,6,7], result1 = [];
	new DelayMapBatch(array1, (n)=>{
		result1.push(n);
	}, {
		batchSize: 2,
	}).then((status)=>{
		assert.deepEqual(array1, result1);
		assert.strictEqual(status, true);
		done();
	});

	var array2 = [2,3,4,5,6,7,8], result2 = [];
	new DelayMapBatch(array2, (n)=>{
		result2.push(n);
	}, {
		batchSize: 3,
	}).then((status)=>{
		assert.deepEqual(array2, result2);
		assert.strictEqual(status, true);
		done();
	});

	var array3 = [1,2,3,4,5,6,7,8], result3 = [];
	new DelayMapBatch(array3, (n)=>{
		result3.push(n);
	}, {
		batchSize: 4,
	}).then((status)=>{
		assert.deepEqual(array3, result3);
		assert.strictEqual(status, true);
		done();
	});

	var array4 = [1,2,3,4,5,6,7,8], result4 = [];
	new DelayMapBatch(array4, (n)=>{
		result4.push(n);
	}).then((status)=>{
		assert.deepEqual(array4, result4);
		assert.strictEqual(status, true);
		done();
	});
});
QUnit.test('Exception thown within map function', function(assert){
	var done = assert.async(3);

	var array1 = [1,2,3,4,5,6,7], result1 = [];
	new DelayMapBatch(array1, (n)=>{
		if (n == 4) {
			throw new Error(n);
		}
		result1.push(n);
	}, {
		batchSize: 2,
	}).then((status)=>{
		assert.notOk(true, 'then() should not be called in this case');
	}).catch((error)=>{
		assert.deepEqual(array1.slice(0,3), result1);
		assert.ok(error instanceof Error && error.message == 4, 'Error thrown');
		done();
	});

	var array2 = [2,3,4,5,6,7,8], result2 = [];
	new DelayMapBatch(array2, (n)=>{
		if (n == 4) {
			throw new Error(n);
		}
		result2.push(n);
	}, {
		batchSize: 16,
	}).then((status)=>{
		assert.notOk(true, 'then() should not be called in this case');
	}).catch((error)=>{
		assert.deepEqual(array2.slice(0,2), result2);
		assert.ok(error instanceof Error && error.message == 4, 'Error thrown');
		done();
	});

	var array3 = [1,2,3,4,5,6,7,8], result3 = [];
	new DelayMapBatch(array3, (n)=>{
		if (n == 8) {
			throw new Error(n);
		}
		result3.push(n);
	}, {
		batchSize: 4,
	}).then((status)=>{
		assert.notOk(true, 'then() should not be called in this case');
	}).catch((error)=>{
		assert.deepEqual(array3.slice(0,7), result3);
		assert.ok(error instanceof Error && error.message == 8, 'Error thrown');
		done();
	});
});


