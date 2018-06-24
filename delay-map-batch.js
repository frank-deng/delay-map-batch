(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD support.
        define([], factory);
    } else if (typeof exports === 'object') {
        // NodeJS support.
        module.exports = factory();
    } else {
        // Browser global support.
        root.DelayMapBatch = factory();
    }
}(this, function() {
    'use strict';
	var processFunc = function(arr, offset, mapFunc, resolve, reject, param){
		var size = param.batchSize;
		if (size > arr.length - offset) {
			size = arr.length - offset;
		}
		for (var i = 0; i < size; i++) {
			try {
				mapFunc(arr[offset + i], offset + i);
			} catch(e) {
				reject(e);
				return;
			}
		}
		if (offset + param.batchSize < arr.length) { 
			setTimeout(function(){
				processFunc(arr, offset + param.batchSize, mapFunc, resolve, reject, param);
			}, param.delay);
		} else {
			resolve(true);
		}
	}
    var DelayMapBatch = function(arr, mapFunc, iparams){
		//Check parameters
		if (!Array.isArray(arr)) {
			throw TypeError(String(arr)+' is not an array.');
		}
		if ('function' !== typeof(mapFunc)) {
			throw TypeError(String(mapFunc)+' is not a function.');
		}
		var params = {
			delay: 0,
			batchSize: 1,
		};
		Object.assign(params, iparams);
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				processFunc(arr, 0, mapFunc, resolve, reject, params);
			}, 0);
		});
    };
    DelayMapBatch.prototype = {
        constructor: DelayMapBatch,
    };
    return DelayMapBatch;
}));

