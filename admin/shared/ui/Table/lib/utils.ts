import { Row } from "react-table";

export const getRowValue = (row: Row<any>) => {
    const { values } = row;
    return values;
};
