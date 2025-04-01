// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';

// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;



		this.addPublication('toDosDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					title: 1,
					description: 1,
					typeMulti: 1,
					date: 1,
					
				}
			});
		});

		// this.addPublication('toDosList', (filter = {}) => {

		// 	console.log(filter);
		// 	return this.defaultListCollectionPublication(filter, {
		// 		projection: {
		// 			title: 1,
		// 			description: 1,
		// 			typeMulti: 1,
		// 			date: 1,
		// 			userId: 1 
		// 		}
		// 	});
		// });
		
		this.addTransformedPublication('toDosList', async (filter = {}) => {
			return this.defaultListCollectionPublication(filter, {
			  projection: {
				title: 1,
				description: 1,
				typeMulti: 1,
				date: 1,
				userId: 1 
			  }
			});
		  }, async (document: IToDos) => {
			const user = await userprofileServerApi.findOne({ _id: document.userId });
		  
			if (user) {
			  document.user = {
				_id: user._id,
				username: user.username,
				email: user.email
			  };
			} 
			console.log({...document})
			return document; 
		  });

		
		// this.addRestEndpoint(
		// 	'view',
		// 	(params, options) => {
		// 		console.log('Params', params);
		// 		console.log('options.headers', options.headers);
		// 		return { status: 'ok' };
		// 	},
		// 	['post']
		// );

		// this.addRestEndpoint(
		// 	'view/:toDosId',
		// 	(params, _options) => {
		// 		console.log('Rest', params);
		// 		if (params.toDosId) {
		// 			return self
		// 				.defaultCollectionPublication(
		// 					{
		// 						_id: params.toDosId
		// 					},
		// 					{}
		// 				)
		// 				.fetch();
		// 		} else {
		// 			return { ...params };
		// 		}
		// 	},
		// 	['get']
		// );
	}

	beforeInsert(doc: IToDos, context: IContext): Promise<boolean>{
		const user = Meteor.userId();
		if (user) doc.userId = user;
		doc.isCompleted = false; 
		return super.beforeInsert(doc,context);
	}
}

export const toDosServerApi = new ToDosServerApi();
