import TesteContainer from '../testeContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const testeRouterList: (IRoute | null)[] = [
	{
		path: '/teste/:screenState/:testeId',
		component: TesteContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	},
	{
		path: '/teste/:screenState',
		component: TesteContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_CREATE]
	},
	{
		path: '/teste',
		component: TesteContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	}
];
