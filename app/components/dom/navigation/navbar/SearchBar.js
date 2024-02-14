import React, { useEffect } from "react";
import docsearch from '@docsearch/js';
import '@docsearch/css';

export function SearchBar() {
    useEffect(() => {
        docsearch({
            container: '#docsearch',
            appId: 'PZJFX96675',
            indexName: 'developers-embloy',
            apiKey: '7be5a71c147a2f07dfe9f5f06d2470bf',
        });
    }, []);
    return (
        <div id="docsearch" />
    );
}
