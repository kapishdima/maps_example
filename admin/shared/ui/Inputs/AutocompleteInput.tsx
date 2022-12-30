import React, { useState } from "react";

import {
    Button,
    FormField,
    majorScale,
    Pane,
    Popover,
    Spinner,
    TextInput,
} from "evergreen-ui";
import { useQuery } from "react-query";

import { useDebouncedState } from "shared/hooks/useDebouncedState";
import { useOnClickOutside } from "shared/hooks/useClickOutside";

type Extra = string | JSX.Element;

export type AutocompleteItem = {
    label: string;
    value: any;
    extra?: Extra;
};

export type GetItemsFunction = (
    value: string
) => AutocompleteItem[] | Promise<AutocompleteItem[]>;

type AutocompleteInputProps = {
    getItems: GetItemsFunction;
    name: string;
    placeholder?: string;
    label?: string;
    description?: string;
    hint?: string;
    style?: React.CSSProperties;
    onSelect?: (selected: any) => void;
    cleanAfterSelect?: boolean;
};

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
    getItems,
    name,
    placeholder,
    label,
    description,
    hint,
    style,
    onSelect,
    cleanAfterSelect,
}) => {
    const [query, setQuery] = useState(null);
    const [search, setSearch] = useDebouncedState(null, 1000);
    const [isShownAutocompleteItems, setIsShownAutocompleteItems] =
        useState(false);

    const containerRef = React.useRef<HTMLDivElement>();
    useOnClickOutside(containerRef, () => setIsShownAutocompleteItems(false));

    const { data, isFetching } = useQuery(
        [name, search],
        async () => await getItems(search)
    );

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setQuery(value);
        setIsShownAutocompleteItems(true);
        setSearch(value);
    };

    const onClick = (item: AutocompleteItem) => {
        onSelect(item.value);

        setQuery(cleanAfterSelect ? "" : item.label);
        setSearch("");
        setIsShownAutocompleteItems(false);
    };

    return (
        <Pane ref={containerRef} marginBottom={majorScale(3)} style={style}>
            <Popover
                isShown={query ? isShownAutocompleteItems : false}
                minWidth={
                    containerRef.current &&
                    containerRef.current?.getBoundingClientRect()?.width
                }
                minHeight={majorScale(3)}
                statelessProps={{
                    style: {
                        position: "absolute",
                    },
                }}
                content={
                    <Pane
                        width={
                            containerRef.current &&
                            containerRef.current?.getBoundingClientRect()?.width
                        }
                        minHeight={majorScale(4)}
                        maxHeight={majorScale(30)}
                        overflowY="scroll"
                    >
                        {isFetching ? (
                            <Pane
                                width="100%"
                                height={majorScale(4)}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Spinner size={12} />
                            </Pane>
                        ) : (
                            data?.map((item) => (
                                <Button
                                    justifyContent="flex-start"
                                    width="100%"
                                    size="small"
                                    appearance="minimal"
                                    onClick={() => onClick(item)}
                                >
                                    {item.label}
                                    {item.extra}
                                </Button>
                            ))
                        )}
                    </Pane>
                }
            >
                <FormField label={label} description={description} hint={hint}>
                    <TextInput
                        width="100%"
                        placeholder={placeholder}
                        value={query}
                        onChange={onInputChange}
                    />
                </FormField>
            </Popover>
        </Pane>
    );
};
