import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";

const ColorPlugin = require('editorjs-text-color-plugin');
export const EDITOR_TOOLS = {
    code: Code,
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
        }
    },
    paragraph: Paragraph,
    checklist: Checklist,
    Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            colorCollections: ['#9ca3ae', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
            customPicker: true // add a button to allow selecting any colour
        }
    },
    Marker: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            defaultColor: '#FFBF00',
            type: 'marker',
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
        }
    },
};
