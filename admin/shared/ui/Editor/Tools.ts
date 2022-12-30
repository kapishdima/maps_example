import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import Embed from "@editorjs/embed";
import Alignment from "editorjs-text-alignment-blocktune";

export const defaultTools = {
    header: { class: Header, tunes: ["tuneWithAlignement"] },
    paragraph: {
        class: Paragraph,
        tunes: ["tuneWithAlignement"],
    },
    list: List,
    quote: Quote,
    underline: Underline,
    embed: Embed,
    tuneWithAlignement: {
        class: Alignment,
        config: {
            default: "left",
            blocks: {
                header: "center",
                list: "right",
            },
        },
    },
};
