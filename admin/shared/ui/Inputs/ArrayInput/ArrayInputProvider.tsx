import React from "react";

import { FieldArrayWithId, useFieldArray } from "react-hook-form";

import { useControl } from "shared/hooks";

type TArrayInputContext = {
    defaultValue: any;
    fields: any;
    append: (value?: any) => void;
    insert: (id: number) => void;
    remove: (id: number) => void;
    up: (id: number) => void;
    down: (id: number) => void;
    swap: (id: number) => void;
};

export const ArrayInputContext = React.createContext<TArrayInputContext>(null);

type ArrayInputProviderProps = {
    name: string;
    defaultValue: any;
};

export const ArrayInputProvider: React.FC<ArrayInputProviderProps> = ({
    children,
    name,
    defaultValue,
}) => {
    const { control } = useControl();
    const { insert, remove, append, swap, move, fields } = useFieldArray({
        control,
        name,
        shouldUnregister: true,
    });

    return (
        <ArrayInputContext.Provider
            value={{
                append: (value) => append(value || defaultValue),
                insert: (id: number) => insert(id, defaultValue),
                remove: (id: number) => remove(id),
                up: (id: number) => {
                    if (id === 0) {
                        return;
                    }
                    const prevIndex = id - 1;
                    move(id, prevIndex);
                },
                down: (id: number) => {
                    if (id === fields.length - 1) {
                        return;
                    }
                    const nextIndex = id + 1;
                    move(id, nextIndex);
                },
                swap: (id: number) => {
                    if (id === fields.length - 1) {
                        return;
                    }
                    const nextIndex = id + 1;
                    swap(id, nextIndex);
                },
                fields,
                defaultValue,
            }}
        >
            {children}
        </ArrayInputContext.Provider>
    );
};
