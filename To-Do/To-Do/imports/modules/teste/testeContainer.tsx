import React from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import TesteListController from '/imports/modules/teste/pages/testeList/testeListController';
import TesteDetailController from '/imports/modules/teste/pages/testeDetail/testeDetailContoller';

export interface ITesteModuleContext {
	state?: string;
	id?: string;
}

export const TesteModuleContext = React.createContext<ITesteModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, testeId } = useParams();
	const state = screenState ?? props.screenState;
	const id = testeId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <TesteListController />;
		return <TesteDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <TesteModuleContext.Provider value={providerValue}>{renderPage()}</TesteModuleContext.Provider>;
};
