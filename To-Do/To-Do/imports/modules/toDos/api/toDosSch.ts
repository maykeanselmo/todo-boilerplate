import { string } from 'prop-types';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';
import { IUserProfile } from '../../userprofile/api/userProfileSch';



enum TaskVisibility {
	PUBLIC = "PUBLIC",
	PERSONAL = "PERSONAL"
}

export const toDosSch: ISchema<IToDos> = {

	title: {
		type: String,
		label: 'Nome',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: false
	},
	userId: {
		type: String,
		optional: true
	
	},

	isCompleted: {
		type: Boolean,
		optional: false,
		visibilityFunction: () => false
	},
	
	visibility:{
		type: String,
		label: 'Tipo',
		optional: false,
		options: () => [
			{ value: TaskVisibility.PUBLIC, label: 'Público' },
			{ value: TaskVisibility.PERSONAL, label: 'Pessoal' }
		]
	}
};


export interface IToDos extends IDoc {
	
	title: string;
	description: string;
	isCompleted: boolean;
	visibility: TaskVisibility ;
	user?: IUserProfile;
	userId: string;
}
