export const parseWebhookLog = (log) => {
    const lines = log.split('\n');
    const processedLines = lines.map(line => line.replace(/\t/g, '     '));
    return processedLines;
}