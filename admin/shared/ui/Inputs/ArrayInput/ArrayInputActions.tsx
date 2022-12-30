import React from "react";
import {
    Button,
    ChevronDownIcon,
    ChevronUpIcon,
    Pane,
    PlusIcon,
    SwapVerticalIcon,
    TrashIcon,
} from "evergreen-ui";
import { useArrayInput } from "./hooks/useArrayInput";

type ArrayInputActionsProps = {
    index: number;
    isSingle: () => boolean;
    isFirst: () => boolean;
    isLast: () => boolean;
};

export const ArrayInputActions: React.FC<ArrayInputActionsProps> = ({
    index,
    isSingle,
    isFirst,
    isLast,
}) => {
    const { insert, remove, append, up, down, swap } = useArrayInput();

    const onAdd = () => {
        const nextIndex = index + 1;
        isSingle() ? append() : insert(nextIndex);
    };
    return (
        <Pane display="flex" alignItems="center" justifyContent="space-between">
            {!isSingle() && (
                <Button
                    appearance="minimal"
                    intent="danger"
                    onClick={() => remove(index)}
                >
                    <TrashIcon />
                </Button>
            )}

            {!isSingle() && (
                <>
                    <Button
                        type="button"
                        disabled={isFirst()}
                        appearance="minimal"
                        intent="primary"
                        onClick={() => up(index)}
                    >
                        <ChevronUpIcon />
                    </Button>
                    <Button
                        type="button"
                        disabled={isLast()}
                        appearance="minimal"
                        intent="primary"
                        onClick={() => down(index)}
                    >
                        <ChevronDownIcon />
                    </Button>
                    <Button
                        type="button"
                        disabled={isLast()}
                        appearance="minimal"
                        intent="primary"
                        onClick={() => swap(index)}
                    >
                        <SwapVerticalIcon />
                    </Button>
                </>
            )}
        </Pane>
    );
};
