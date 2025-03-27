import { string } from 'prop-types';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';
import { IUserProfile } from '../../userprofile/api/userProfileSch';

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
	typeMulti: {
		type: String,
		label: 'Prioridade',
		optional: false,
		options: () => [
			{ value: 'alta', label: 'Alta' },
			{ value: 'media', label: 'Média' },
			{ value: 'baixa', label: 'Baixa' }
		]
	},
	date: {
		type: Date,
		label: 'Data',
		optional: false
	
	},
	userId: {
		type: String,
		optional: false,
		visibilityFunction: () => false
	
	}
};


export interface IToDos extends IDoc {
	
	title: string;
	description: string;
	typeMulti: string;
	date: Date;
	user?: IUserProfile
	userId: string
}
