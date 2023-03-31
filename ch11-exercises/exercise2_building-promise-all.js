/*
 * Building Promise.all
 *
 * Given an array of promises, Promise.all returns a promise that waits for all
 * of the promises in the array to finish. It then succeeds, yielding an array
 * of result values. If a promise in the array fails, the promise returned by
 * all fails too, with the failure reason from the failing promise. Implement
 * something like this yourself as a regular function called Promise_all.
 *
 * Remember that after a promise has succeeded or failed, it can’t suc-
 * ceed or fail again, and further calls to the functions that resolve it are
 * ignored. This can simplify the way you handle failure of your promise.
 */

async function Promise_all(arrayOfPromises) {
    let resultsArray = [];
    for (i = 0; i < arrayOfPromises.length; i++) {
        let promise = arrayOfPromises[i];
        try {
            let result = await promise;
            resultsArray.push(result);
        } catch (error) {
            return Promise.reject(`Promise with index ${i} rejected with error: ${error.name}, ${error.message}`);
        }
    }
    return resultsArray;
}

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise_all([promise1, promise2, promise3])
    .then(values => {
        console.log(values);
    })
    .catch(error => {
        console.log(error);
    });

const promise4 = Promise.resolve(1);
const promise5 = Promise.resolve(2);
const promise6 = Promise.resolve(3);
const promise7 = Promise.reject(new Error('rejection!'));

Promise_all([promise4, promise5, promise6, promise7])
    .then(values => {
        console.log(values);
    })
    .catch(error => {
        console.log(error);
    });
