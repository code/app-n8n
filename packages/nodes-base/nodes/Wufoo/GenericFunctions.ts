import type { OptionsWithUri } from 'request';

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function wufooApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	resource: string,

	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('wufooApi');

	let options: OptionsWithUri = {
		method,
		form: body,
		body,
		qs,
		uri: `https://${credentials.subdomain}.wufoo.com/api/v3/${resource}`,
		json: true,
	};

	options = Object.assign({}, options, option);
	if (Object.keys(options.body as IDataObject).length === 0 || method === 'PUT') {
		delete options.body;
	}

	return await this.helpers.requestWithAuthentication.call(this, 'wufooApi', options);
}
