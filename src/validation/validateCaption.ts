import { Grammar } from "../Grammar";
import { captionToken } from "../Token";

export class ValidateCaption {

    public static validate(token: captionToken): captionToken {         
                        
        //console.log(`Validating caption token: ${JSON.stringify(token)}`);

        // Checking date field
        if (!token.date || !token.date.trim()) {
            token.date = "Missing date";
        } else if (token.title.length > 200) {
            token.date = "Title too long (max 200 chars)";
        } 
        if (!token.date.match(Grammar.BLOCKS.CAPTION_DATE)) {
            token.date = "Invalid date format";            
        }

        // Checking thumbnail field
        if (!token.thumbnail || !token.thumbnail.trim()) {
            token.thumbnail = "Missing thumbnail";
        } else if (!token.thumbnail.match(Grammar.BLOCKS.CAPTION_THUMBNAIL)) {
            token.thumbnail = "Invalid thumbnail format";
        }

        // Checking slug field
        if (!token.slug || !token.slug.trim()) {
            token.slug = "Missing slug";
        } else if (!token.slug.match(Grammar.BLOCKS.CAPTION_SLUG)) {
            token.slug = "Invalid slug format";
        }

        // Checking cluster field
        if (!token.cluster || !token.cluster.trim()) {
            token.cluster = "Missing cluster";
        } else if (!token.cluster.match(Grammar.BLOCKS.CAPTION_CLUSTER)) {
            token.cluster = "Invalid cluster format";
        }

        // Checking order field
        if (!token.order || !token.order.trim()) {
            token.order = "Missing order";
        } else if (isNaN(Number(token.order))) {
            token.order = "Order must be a number";
        }

        return token;   
    }
}