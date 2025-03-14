// @ts-ignore
import React from "react";
import { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "@/app/components/dom/main/misc/EditorTools";
import DragDrop from 'editorjs-drag-drop';
//props
type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
    //add a reference to editor
    const ref = useRef<EditorJS>();

    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
                onReady: () => {
                    new DragDrop(editor);
                },
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);


    return <div id={holder} className="prose w-[720px] m:0" />;
};

export default memo(EditorBlock);
