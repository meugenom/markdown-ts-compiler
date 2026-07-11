import { BadgeHTML } from "../htmlblocks/BadgeHTML";

interface BadgeToken {
    color: string;
    value: string;
}


describe('Badge Render Tests', () => {

    test('Badge renders correctly', () => {
        
        const token: BadgeToken = {
            color: 'blue',
            value: 'Test Badge'
        };

        const badgeHTML = new BadgeHTML(token);
        const renderedHTML = badgeHTML.render();        
        console.log(renderedHTML);
        expect(renderedHTML).toContain('<span class=\"bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded\">Test Badge</span>');

    });

});