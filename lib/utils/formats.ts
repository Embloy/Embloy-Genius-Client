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
export const cast_date = (args: string, format_code: string) => {
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

        if (question.question_type === "yes_no") {
            const checklistBlock: EditorBlock = {
                id: `checklist_${index}`,
                type: "checklist",
                data: {
                    items: [
                        {
                            text: "Yes",
                            checked: false
                        },
                        {
                            text: "No",
                            checked: false
                        }
                    ]
                }
            };
            blocks.push(checklistBlock);
        } else if (question.question_type === "single_choice" || question.question_type === "multiple_choice") {
            const options = question.options || [];
            const checklistItems = options.map(option => ({
                text: option,
                checked: false
            }));
            const checklistBlock: EditorBlock = {
                id: `checklist_${index}`,
                type: "checklist",
                data: {
                    items: checklistItems
                }
            };
            blocks.push(checklistBlock);
        } else if (question.question_type === "text") {
            // Handle text input differently if needed
            const textBlock: EditorBlock = {
                id: `paragraph_${index}`,
                type: "paragraph",
                data: {text: "Enter your response here"}
            };
            blocks.push(textBlock);
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
        } else if (block.type === "checklist") {
            if (currentQuestion) {
                if (block.data.items && block.data.items.length > 0) {
                    const options = block.data.items.map((item: any) => item.text);
                    currentQuestion.options = options;
                }
            }
        } else if (block.type === "paragraph") {
            const questionType: QuestionType = block.data.original_type || "text";
            if (currentQuestion) {
                //do nothing => but here would be place to handle config data and or text field requirements set by the user
            }
        }
    });


    return inputData;
}