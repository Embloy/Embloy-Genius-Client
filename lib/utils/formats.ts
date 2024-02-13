import {InputData, Question, QuestionType} from "@/lib/types/question";
import {EditorBlock, EditorData} from "@/lib/types/editor";

export const cast_datetime = (args: string, format_code: string) => {
    const datetime = new Date(args);
    let formattedDatetime = '';

    switch (format_code.toLowerCase()) {
        case 'us':
            formattedDatetime = datetime.toLocaleString('en-US');
            break;
        case 'uk':
            formattedDatetime = datetime.toLocaleString('en-GB');
            break;
        case 'iso':
            formattedDatetime = datetime.toISOString();
            break;
        case 'de':
            formattedDatetime = datetime.toLocaleString('de-DE');
            break;
        default:
            formattedDatetime = args;
            break;
    }

    return formattedDatetime;
}
export const cast_date = (args: string, format_code:string) => {
    const date = new Date(args);
    let formattedDate = '';

    switch (format_code.toLowerCase()) {
        case 'us':
            formattedDate = date.toLocaleDateString('en-US');
            break;
        case 'uk':
            formattedDate = date.toLocaleDateString('en-GB');
            break;
        case 'iso':
            formattedDate = date.toISOString();
            break;
        case 'de':
            formattedDate = date.toLocaleDateString('de-DE');
            break;
        case 'time-us':
            formattedDate = date.toLocaleTimeString('en-US');
            break;
        case 'time-uk':
            formattedDate = date.toLocaleTimeString('en-GB');
            break;
        case 'time-de':
            formattedDate = date.toLocaleTimeString('de-DE');
            break;
        default:
            formattedDate = args;
            break;
    }

    return formattedDate;
}



export const date_seconds_from_now = (seconds: number) => {
    const now = new Date(); // Current date and time
    const futureDate = new Date(now.getTime() + seconds * 1000);
    return futureDate.toISOString();

}
export function isCharInAlphabet(char: string, alphabet: string): string {
    return alphabet.includes(char) ? char : 'Slug';
}
export const alpha_24 = 'abcdefghijklmnopqrstuvwxyz';


export function json_to_editor(inputData: InputData): EditorData {
    const blocks: EditorBlock[] = [];
    inputData.forEach((question, index) => {
        const headerBlock: EditorBlock = {
            id: `question_${index}`,
            type: "header",
            data: {
                text: question.question,
                level: 3,
                original_type: question.question_type
            }
        };
        blocks.push(headerBlock);

        if (question.options && question.options.length > 0) {
            const listItems = question.options.map(option => `<li>${option}</li>`).join('');
            const listBlock: EditorBlock = {
                id: `options_${index}`,
                type: "list",
                data: {
                    style: "unordered",
                    items: listItems,
                    original_type: question.question_type
                }
            };
            blocks.push(listBlock);
        }
    });
    return {
        time: Date.now(),
        blocks: blocks,
        version: "2.8.1"
    };
}
export function editor_to_json(editorData: EditorData): InputData {
    const inputData: InputData = [];
    let currentQuestion: Question | null = null;

    editorData.blocks.forEach(block => {
        if (block.type === "header") {
            const questionType: QuestionType = block.data.original_type || "text"; // Use the original type if available, otherwise default to "text"
            currentQuestion = {
                question: block.data.text,
                question_type: questionType,
                required: true // Placeholder value, since required isn't directly translatable
            };
            inputData.push(currentQuestion);
        } else if (block.type === "list") {
            if (currentQuestion) {
                currentQuestion.options = block.data.items
                    .split("<li>")
                    .map(item => item.replace("</li>", ""))
                    .filter(Boolean);
            }
        }
    });

    return inputData;
}