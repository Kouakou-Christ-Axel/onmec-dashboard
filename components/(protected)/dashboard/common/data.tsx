import {
	IconDashboard,
	IconAlarmAverage,
	IconFolder,
	IconBooks,
	IconUsers,
	IconHelp,
	IconSettings,
	IconBrain,
} from '@tabler/icons-react';

export const data = {
	navMain: [
		{
			title: 'Tableau de bord',
			url: '/dashboard',
			icon: IconDashboard,
		},
		{
			title: 'Signalements',
			url: '/dashboard/signalements',
			icon: IconAlarmAverage,
		},
		{
			title: 'Actualités',
			url: '/dashboard/actualites',
			icon: IconFolder,
		},
		{
			title: 'Librairie',
			url: '/dashboard/librairie',
			icon: IconBooks,
		},
		{
			title: 'Quiz',
			url: '/dashboard/quizz',
			icon: IconBrain,
		},
		{
			title: 'Utilisateurs',
			url: '/dashboard/utilisateurs',
			icon: IconUsers,
		},
	],
	navSecondary: [
		{
			title: 'Paramètres',
			url: '#',
			icon: IconSettings,
		},
		{
			title: 'Aide',
			url: '#',
			icon: IconHelp,
		},
	],
};
