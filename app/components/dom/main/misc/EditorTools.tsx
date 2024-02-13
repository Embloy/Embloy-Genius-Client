import Header from '@editorjs/header';
import List from '@editorjs/list';
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
export const EDITOR_TOOLS = {
    code: Code,
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a Header',
            levels: [2, 3, 4],
            defaultLevel: 2
        }
    },
    paragraph: Paragraph,
    checklist: CheckList,
    embed: Embed,
    image: Image,
    inlineCode: InlineCode,
    link: Link,
    list: List,
    quote: Quote,
    simpleImage: SimpleImage,
    delimiter: Delimiter
};