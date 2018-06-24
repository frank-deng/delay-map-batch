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
	var processFunc = function(arr, offset, batchSize, mapFunc, resolve, reject, param){
		if (offset + batchSize < arr.length) { 
			setTimeout(function(){
				processFunc(arr, offset+batchSize, batchSize, mapFunc, resolve, reject, param);
			}, param.delay);
			var size = batchSize;
			if (size > arr.length - offset) {
				size = arr.length - offset;
			}
			for (var i = 0; i < size; i++) {
				try {
					mapFunc(arr[offset + i], offset + i);
				} catch(e) {
					reject(e);
				}
			}
		} else {
			resolve(true);
		}
	}
    var DelayMapBatch = function(arr, mapFunc, params){
		//Check parameters
		if (!Array.isArray(arr)) {
			throw TypeError(String(arr)+' is not an array.');
		}
		if ('function' !== typeof(mapFunc)) {
			throw TypeError(String(mapFunc)+' is not a function.');
		}
		return new Promise(function(resolve, reject){
			processFunc(arr, 0, 100, mapFunc, resolve, reject, {
				delay: 0,
			});
		});
    };
    DelayMapBatch.prototype = {
        constructor: DelayMapBatch,
    };
    return DelayMapBatch;
}));

