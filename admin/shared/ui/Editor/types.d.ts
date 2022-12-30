import { UseControllerProps } from "react-hook-form";

export type EditorProps = Pick<
    UseControllerProps,
    "name" | "rules" | "defaultValue"
> & {
    name: string;

    id?: string;
    placeholder?: string;
    label?: string;
    small?: boolean;
};

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
    }
}
