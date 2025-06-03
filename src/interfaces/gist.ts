export default interface Gist {
	id: string;
	title?: string;
	description?: string;
	files?: {
		[key: string]: {
			filename: string;
			language: string;
			raw_url: string;
			size: number;
			type: string;
		};
	};
	owner: {
		id: number;
		avatar_url: string;
		login: string;
		url: string;
		html_url: string;
		type: string;
		gists_url: string;
		node_id: string;
	};
	public?: boolean;
	updated_at: string;
	created_at: string;
	// add other fields as needed
}

export interface User {
	login: string;
	avatar_url: string;
	url: string;
	html_url: string;
	type: string;
	gists_url: string;
}