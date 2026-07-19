import { convertMDtoHTML } from "./index";
import "./static/styles/style.css";
import 'katex/dist/katex.min.css';
import example from 'raw-loader!./content/articles/how-to-write-text.md';

// 1. Shablon for the entire page, including the article content
function getTemplate(articleHtml: string): string {    
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentIcon = currentTheme === 'dark' ? '🌙' : '☀️';
    console.log('currentTheme:', currentTheme);

    return `
    <div class="w-full border-b border-gray-300 dark:border-gray-700">
        <div class="container mx-auto px-4">            
            <nav class="flex items-center justify-start gap-4 py-4 border-b border-gray-200 dark:border-gray-800">                
                <div class="font-bold text-lg">Demo "markdown-ts-compiler" v.0.9.4</div>                                
                <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none" style="font-size: 1.5rem; cursor: pointer; line-height: 1;">
                    ${currentIcon}
                </button>
            </nav>
        </div>        
        <div class="container mx-auto px-4 mt-6 pb-12">
            ${articleHtml}
        </div>
    </div>`;
}

// 2. Main init for the app
async function initApp() {
    const contentContainer = document.getElementById('content');
    if (!contentContainer) return;

    try {
        // First apply the saved theme from localStorage (or default to light)
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyThemeClass(savedTheme);

        // Wait for the article content to be converted from Markdown to HTML
        const articleHtml = await convertMDtoHTML(example);        
        
        // Rendering the entire page with the article content
        contentContainer.innerHTML = getTemplate(articleHtml);

        setupThemeToggle();

    } catch (error) {
        console.error("Error initializing the app:", error);
    }
}

// 3. Setup click handler for the theme toggle button (called once after rendering)
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn?.addEventListener('click', () => {
        
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';        
        applyThemeClass(newTheme);
        localStorage.setItem('theme', newTheme);    
        
        if (themeToggleBtn) {
            themeToggleBtn.innerText = newTheme === 'dark' ? '🌙' : '☀️';
        }
    });
}

// 4. Utility function for toggling the theme class on the root element
function applyThemeClass(theme: string) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
}

// Start the app initialization
initApp();