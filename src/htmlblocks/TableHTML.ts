'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as list
 */

import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";

export class TableHTML {

	private DomUtilites: any;
	private token: Token.tableToken;

	constructor(token: Token.tableToken) {
		this.token = token;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {

		let children: any[];
		children = this.token.children;

		let table: string;
		let tableNode: Element;

		let tableHead: string;
		let tableBody: string;


		tableNode = this.DomUtilites.createElement("table");
		tableNode.className = "shadow-lg bg-white mb-4"


		tableBody = "<tbody>"
		let headArray: string[];
		let bodyArray: string[];

		for (let i = 0; i < children.length; i++) {

			//thead
			if (i == 0) {
				tableHead = "<thead><tr>";
				headArray = (children[0].value).split("|");
				headArray.pop();
				headArray.shift();
				headArray.forEach(head => {
					tableHead = tableHead + `<th class="bg-blue-100 border text-left px-8 py-4">${head}</th>`
				})
				tableHead = tableHead + '</tr></thead>'
				table = tableHead;

				//tbody
			} else {
				bodyArray = (children[i].value).split("|");
				bodyArray.pop();
				bodyArray.shift();
				tableBody = "<tr>";
				bodyArray.forEach(body => {
					tableBody = tableBody + `<td class="border px-8 py-4">${body}</td>`
				})
				tableBody = tableBody + '</tr>'
				table = table + tableBody;
			}
		}
		table = table + "</tbody>";
		tableNode.innerHTML = table;


		const paragraphNode = this.DomUtilites.createElement("p");
		paragraphNode.appendChild(tableNode);

		let container: ChildNode;
		if (document.getElementById("app")?.children.length > 0) {
			container = document.getElementById("app")?.lastChild;
		} else {
			container = document.getElementById("app");
		}
		container?.appendChild(paragraphNode);

	}

}