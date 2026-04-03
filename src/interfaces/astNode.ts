export interface ASTNode {
    type: string;        // Type of the node (e.g., "Heading", "Paragraph", "Text", etc.)
	token?: any;      // Optional token associated with this node
    raw: string;
    children: ASTNode[]; // Results for next time 
}
