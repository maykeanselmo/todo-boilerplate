import React, { useCallback, useMemo } from 'react';
import ToDosListView from './toDosListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from '../../api/toDosSch';
import { toDosApi } from '../../api/toDosApi';
import AuthContext from '../../../../app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IToDosListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IToDos[];
	schema: ISchema<any>;
	onEditButtonClick: (id:any) => void;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const ToDosListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

	const { title,  typeMulti, date, user, userId} = toDosApi.getSchema();
	const toDosSchReduzido = { title, typeMulti, date, user, userId };
	const sysLayoutContext = React.useContext(AppLayoutContext);


	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, toDoss } = useTracker(() => {
		const subHandle = toDosApi.subscribe('toDosList', filter, {
			sort
		})??null;
		
		const toDoss = subHandle?.ready() ? toDosApi.find(filter, { sort }).fetch() : [];
		console.log("Dados recebidos do servidor:", toDoss);
		return {
			toDoss,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : toDoss.length
		};
		
	}, [config]);
	

	const onAddButtonClick = useCallback(() => {
		sysLayoutContext.showModal({
			title: 'Editar grupo de sensores',
			urlPath: '/toDos/create',
			sx: {
				width: '60%',
				maxWidth: '700px',
				overflowY: 'hidden',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: 'auto',
				position: 'fixed', 
				top: '50%',
				left: '50%', 
				transform: 'translate(-50%, -50%)', 
				borderRadius: 3
			},
			onClose: () => sysLayoutContext.closeModal()
		  });
	}, []);

	const onEditButtonClick = useCallback((id:any) => {
		sysLayoutContext.showModal({
			title: 'Editar grupo de sensores',
			urlPath: '/toDos/edit/' + id,
			sx: {
			  width: '60%',
			  maxWidth: '700px',
			  overflowY: 'hidden',
	  
			},
			onClose: () => sysLayoutContext.closeModal()
		  });
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		toDosApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			onEditButtonClick,
			todoList: toDoss,
			schema: toDosSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory
		}),
		[toDoss, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
