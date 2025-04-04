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
import { isEqual } from 'lodash';
import ToDosDetailView from '../toDosDetail/toDosDetailView';
import ToDosDetailController from '../toDosDetail/toDosDetailContoller';

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
	onEditButtonClick: (row: any) => void;
	toggleTaskCompletion : (taskId:any, isCompleted:boolean) => void;
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
	const authContext= React.useContext(AuthContext);

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

	const toggleTaskCompletion = (taskId:any, isCompleted:boolean) => {
		const toggle = !isCompleted;
		toDosApi.callMethod('tasks.toggleComplete', taskId, toggle);
	}
	

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

	const onEditButtonClick = useCallback((task: any) => {
		
			 if(task.userId===authContext.user?._id){
				sysLayoutContext.showModal({
					title: 'Editar grupo de sensores',
					urlPath: '/toDos/edit/' + task._id,
					sx: {
					  width: '727px',
					  maxWidth: '727px',
					  height:'856px',
					  overflowY: 'hidden',
					  borderRadius: "10px"
			  
					},
					onClose: () => sysLayoutContext.closeModal()
				  });
			 } else{
				alert("Só o dono da tarefa pode alterá-la");
			 }
			 
	}, []);

	const onDeleteButtonClick = useCallback((task: any) => {
		
		if(task.userId===authContext.user?._id){
			toDosApi.remove(task);
		 } else {
			alert("Só o dono da tarefa pode excluí-la");
		 }
	
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
			toggleTaskCompletion,
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
