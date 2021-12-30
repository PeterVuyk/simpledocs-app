interface PromiseResponse {
  status: 'fulfilled' | 'rejected';
  value?: any;
  reason?: any;
}

/**
 * For now we use this 'promiseAllSetled()' function that is identical to the the Promise.AllSetled().
 * In the future when we update the versions we can try to replace it with the Promise allSetled. Because now
 * it gives an error: Unhandled promise rejection: TypeError: Promise.allSettled is not a function.
 * Read also: https://stackoverflow.com/questions/66575667/promise-allsettled-is-not-a-function
 */
const promiseAllSettled = (promises: any): Promise<PromiseResponse[]> => {
  return Promise.all(
    promises.map((promise: any) =>
      promise
        .then((value: any) => ({ status: 'fulfilled', value }))
        .catch((reason: any) => ({ status: 'rejected', reason })),
    ),
  );
};

export default promiseAllSettled;
