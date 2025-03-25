import React, { createContext, useCallback, useContext } from 'react';
import TesteDetailView from './testeDetailView';
import { useNavigate } from 'react-router-dom';
import { TesteModuleContext } from '../../testeContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { testeApi } from '../../api/testeApi';
import { ITeste } from '../../api/testeSch';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { SysAppLayoutContext } from '/imports/app/appLayout';

interface ITesteDetailContollerContext {
	closePage: () => void;
	document: ITeste;
	loading: boolean;
	schema: ISchema<ITeste>;
	onSubmit: (doc: ITeste) => void;
	changeToEdit: (id: string) => void;
}

export const TesteDetailControllerContext = createContext<ITesteDetailContollerContext>(
	{} as ITesteDetailContollerContext
);

const TesteDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(TesteModuleContext);
	const { showNotification } = useContext(SysAppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? testeApi.subscribe('testeDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? testeApi.findOne({ _id: id }) : {};
		return {
			document: (document as ITeste) ?? ({ _id: id } as ITeste),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/teste/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: ITeste) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		testeApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	return (
		<TesteDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: testeApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<TesteDetailView />}
		</TesteDetailControllerContext.Provider>
	);
};

export default TesteDetailController;
