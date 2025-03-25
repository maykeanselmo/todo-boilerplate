// region Imports
import { ProductBase } from '../../../api/productBase';
import { testeSch, ITeste } from './testeSch';

class TesteApi extends ProductBase<ITeste> {
	constructor() {
		super('teste', testeSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}
}

export const testeApi = new TesteApi();
