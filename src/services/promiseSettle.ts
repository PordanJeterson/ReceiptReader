// I did not write this, found at https://stackoverflow.com/questions/36605253/es6-promise-all-error-handle-is-settle-needed/36605453#36605453

// @ts-ignore
const settle = function (promises: Promise<any>[]) {
    function PromiseInspection(fulfilled: Function, val: Function) {
        return {
            isFulfilled: function () {
                return fulfilled;
            }, isRejected: function () {
                return !fulfilled;
            }, isPending: function () {
                // PromiseInspection objects created here are never pending
                return false;
            }, value: function () {
                if (!fulfilled) {
                    throw new Error("Can't call .value() on a promise that is not fulfilled");
                }
                return val;
            }, reason: function () {
                if (fulfilled) {
                    throw new Error("Can't call .reason() on a promise that is fulfilled");
                }
                return val;
            }
        };
    }

    return Promise.all(promises.map(function (p) {
        // make sure any values are wrapped in a promise
        return Promise.resolve(p).then(function (val) {
            // @ts-ignore
            return new PromiseInspection(true, val);
        }, function (err) {
            // @ts-ignore
            return new PromiseInspection(false, err);
        });
    }));
};

// @ts-ignore
export default settle;