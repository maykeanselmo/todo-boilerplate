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
					userId: 1,
					isCompleted: 1
					
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
			return this.defaultListCollectionPublication(
			  {
				...filter,
				$or: [
				  { visibility: 'PUBLIC' }, 
				  { visibility: 'PERSONAL', userId: Meteor.userId() } 
				]
			  },
			  {
				projection: {
					title: 1,
					description: 1,
					date: 1,
					userId: 1,
					isCompleted: 1
				}
			  }
			  
			);
		  }, async (document: IToDos) => {
			const user = await userprofileServerApi.findOne({ _id: document.userId });
		  
			if (user) {
			  document.user = {
				_id: user._id,
				username: user.username,
				email: user.email
			  };
			}
		  
			return document;
		});

		this.addTransformedPublication('toDosLastFive', async () => {
			return this.defaultListCollectionPublication(
				{
					$or: [
						{ visibility: 'PUBLIC' },
						{ visibility: 'PERSONAL', userId: Meteor.userId() }
					]
				},
				{
					sort: { createdat: -1 }, 
					limit: 5,
					projection: {
						title: 1,
						description: 1,
						typeMulti: 1,
						date: 1,
						userId: 1,
						isCompleted: 1,
						createdat: 1
						
					}
				}
			);
		}, async (document: IToDos) => {
			const user = await userprofileServerApi.findOne({ _id: document.userId });
		
			if (user) {
				document.user = {
					_id: user._id,
					username: user.username,
					email: user.email
				};
			}
		
			return document;
		});


		this.registerMethod('tasks.toggleComplete', async (taskId: any, isCompleted:boolean)=>{
		
			check(taskId, String)
			check(isCompleted, Boolean);
			await this.collectionInstance.updateAsync(
				{ _id: taskId },
      			{ $set: { isCompleted } }

			)
		})
	}

	beforeInsert(doc: IToDos, context: IContext): Promise<boolean>{
		const userId = Meteor.userId();
		if (userId) {
			doc.teste = userId;
			doc.userId = userId;
		}
		doc.isCompleted = false; 
		return super.beforeInsert(doc,context);
	}

	async beforeUpdate(doc: any, context: IContext): Promise<boolean> {

		const current = await this.collectionInstance.findOneAsync({ _id: doc._id });
	
		console.log('[BEFORE UPDATE] doc recebido:', doc);
		console.log('[BEFORE UPDATE] doc atual no banco:', current);
	
		if (current) {
			doc.userId = context.user._id!;
			console.log('[BEFORE UPDATE] userId final após merge:', doc.userId);
		}
		
		return super.beforeUpdate(doc, context);
	}
	async afterUpdate(doc: any, context: IContext): Promise<any> {
		
		console.log("after update", {doc});
		return super.afterUpdate(doc, context);
	}


}

export const toDosServerApi = new ToDosServerApi();
