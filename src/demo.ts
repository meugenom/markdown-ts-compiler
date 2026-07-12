import { convertMDtoHTML } from "./index";
import "./static/styles/style.css";
import "./static/styles/list.css";
import "./static/styles/table.css";
import 'katex/dist/katex.min.css';
import example from 'raw-loader!./content/articles/how-to-write-text.md';

async function showExample() {
    if (document.getElementById('content') !== null) {
        const htmlString = await convertMDtoHTML(example);        
        const contentContainer = document.getElementById('content');
        if (contentContainer) {
            contentContainer.innerHTML = htmlString;
        }            
    }
}
showExample();