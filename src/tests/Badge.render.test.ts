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
        expect(renderedHTML).toContain('<span class=\"md-badge md-badge-blue\">Test Badge</span>');

    });

});