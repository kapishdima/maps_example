const shoudUpdate = (prevState, currentState) => prevState !== currentState;

const isIterable = (target) => Array.isArray(target);

const handler = (subscribe) => ({
    set: (target, prop, value, receiver) => {
        if (isIterable(target)) {
            const prevState = target.length;
            if (target.includes(value)) {
                return true;
            }

            Reflect.set(target, prop, value, receiver);

            if (shoudUpdate(prevState, target.length)) {
                if (subscribe && typeof subscribe === "function") {
                    subscribe(target);
                }
            }

            return true;
        }

        Reflect.set(target, prop, value, receiver);

        if (subscribe && typeof subscribe === "function") {
            subscribe(target);
        }

        return true;
    },
});

export const createStore = (initialStore, subscribe) => {
    const store = new Proxy(initialStore, handler(subscribe));

    return store;
};
