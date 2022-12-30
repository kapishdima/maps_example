import React, { useEffect, useState } from "react";

import { AutocompleteInput, AutocompleteItem } from "./AutocompleteInput";
import { useWineriesService } from "features/Wineries/hooks/useWineriesService";
import { useControl, useDebouncedState } from "shared/hooks";
import { WineriesServiceProvider } from "features/Wineries";
import {
    Pane,
    majorScale,
    Popover,
    Spinner,
    Button,
    FormField,
    TextInput,
} from "evergreen-ui";
import { useQuery } from "react-query";

type WineriesSelectProps = {
    name?: string;
};

export const WineriesSelect: React.FC<WineriesSelectProps> = ({ name }) => {
    return (
        <WineriesServiceProvider>
            <WineriesSelectView name={name} />
        </WineriesServiceProvider>
    );
};

const WineriesSelectView: React.FC<WineriesSelectProps> = ({ name }) => {
    const wineriesService = useWineriesService();
    const { setValue, getValues } = useControl();

    const inputName = name || "winery_id";

    const [query, setQuery] = useState<string>(getValues(inputName));
    const [search, setSearch] = useDebouncedState(null, 1000);
    const [isShownAutocompleteItems, setIsShownAutocompleteItems] =
        useState(false);

    const containerRef = React.useRef<HTMLDivElement>();

    const { data, isFetching } = useQuery([name, search], async () => {
        if (!search) {
            return null;
        }
        const wineries = await wineriesService.searchWinery(search);

        return wineries.data.map((location) => {
            return {
                label: location.name,
                value: location.id,
            };
        });
    });

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setQuery(value);
        setIsShownAutocompleteItems(true);
        setSearch(value);
    };

    const onClick = (item: AutocompleteItem) => {
        setValue(inputName, item.value);

        setQuery(item.label);

        setSearch("");
        setIsShownAutocompleteItems(false);
    };

    return (
        <Pane
            ref={containerRef}
            marginBottom={majorScale(3)}
            style={{ width: "90%" }}
        >
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
                                </Button>
                            ))
                        )}
                    </Pane>
                }
            >
                <FormField label="Wineries">
                    <TextInput
                        width="100%"
                        placeholder="Search wineries"
                        value={query}
                        onChange={onInputChange}
                    />
                </FormField>
            </Popover>
        </Pane>
    );
};
