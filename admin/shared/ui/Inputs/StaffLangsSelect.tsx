import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectManyInput } from "./SelectManyInput";

export const StaffLangsSelect: React.FC = () => {
    const { staffLangs } = useCommonDataContext();

    if (!staffLangs) {
        return null;
    }

    const staffLangsForSelect = staffLangs.map((sl) => ({
        label: sl.language,
        value: sl.id,
    }));

    return (
        <SelectManyInput
            name="staff_langs"
            options={staffLangsForSelect}
            title="Staff Langs"
            label="Staff Langs"
            buttonText="Select staff langs"
            hasFilter={false}
            height={180}
        />
    );
};
