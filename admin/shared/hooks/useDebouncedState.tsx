import React, { useEffect, useState } from "react";

import { debounce, DebouncedFunc } from "lodash";

type UseDebounseReturn<V> = [
    value: V,
    changeFunction: DebouncedFunc<(value: any) => void>
];

export function useDebouncedState<V>(
    value: V,
    delay: number
): UseDebounseReturn<V> {
    const [debouncedValue, setDebouncedValue] = useState<V>(value);

    const debouncedFunction = React.useCallback(
        debounce((value) => {
            setDebouncedValue(value);
        }, delay),
        [value]
    );

    useEffect(() => {
        return () => {
            debouncedFunction.cancel();
        };
    }, [debouncedFunction]);

    return [debouncedValue, debouncedFunction];
}
