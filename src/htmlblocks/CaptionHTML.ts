'use strict'
import * as Token from "../Token";


export class CaptionHTML {
	private token: Token.captionToken;

	constructor(token: Token.captionToken) {
		this.token = token;		
	}

	public renderAsElement(): HTMLElement {		

		let tagsBlock = "";
		this.token.tags.toString().split(" ").map((tag: string) => {
			if (tag.length > 0) {
				tagsBlock = tagsBlock +
					'<a navigateLinkTo="/tag/' + tag + '" href="/tag/' + tag + '" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400  hover:bg-orange-600 last:mr-0 mr-1">' +
						tag +	
					'</a>'
			}
		});

		
		let clusterBlock = "";
		const validCluster = this.token.cluster && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(this.token.cluster.trim());
		if (validCluster) {
			const cluster = this.token.cluster.trim();
			clusterBlock =
				'<a navigateLinkTo="/article/' + cluster + '" href="/article/' + cluster + '" class="text-xs font-semibold inline-block py-1 px-2 rounded  text-white bg-gray-400  hover:bg-gray-600 uppercase last:mr-0 mr-1">' +
					' -> Return to Main Article ' + 
				'</a>'
		}
		

		const rawThumbnail = this.token.thumbnail.trim().replace(/['"]/g, '').replace(/^\.?\//, '');
		const hasThumbnail = rawThumbnail.length > 0 && /\.(png|jpg|jpeg|webp)$/i.test(rawThumbnail);
		const thumbnail = rawThumbnail;

		const thumbnailBlock = hasThumbnail
			? `<div class="flex-none">
				<img src="${thumbnail}" 
				 class="float-left object-contain h-64 w-full max-w-xs"/>
			</div>`
			: '';

		let CaptionBlock =
		`
		<div class = "flex flex-col md:flex-row gap-6">
			${thumbnailBlock}
			<div class="flex-auto justify-start">
				<h3 class="text-3xl font-sans font-semibold leading-tight mt-0 mb-2">
					${this.token.title}

				</h3>
				<time class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 uppercase last:mr-0 mr-1">
					${this.token.date}
				</time> 
				<div class="tag-container mt-3 py-1">
					${tagsBlock}
				</div>				
		`	
			// if cluster is main article (order 0), no need to show
			if(this.token.order != "0" && validCluster){
				CaptionBlock +=

				`
				<div class=" mt-2 py-1">
					${clusterBlock}
				</div>				
				`
			}

		CaptionBlock += 	
		`
			</div>
		</div>
		<hr/>
		`;

		//add caption to htmlOutput
		const captionNode = document.createElement('p');
		captionNode.innerHTML = CaptionBlock;

		return captionNode;
		
	}
}