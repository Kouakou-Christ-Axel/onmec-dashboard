'use client';

import {usePathname} from 'next/navigation';
import {ThemeSwitch} from '@/components/theme-switch';
import {Separator} from '@/components/ui/separator';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {IconBell} from '@tabler/icons-react';

const PAGE_TITLES: Record<string, string> = {
	'/dashboard': 'Tableau de bord',
	'/dashboard/signalements': 'Signalements',
	'/dashboard/actualites': 'Actualités',
	'/dashboard/librairie': 'Librairie',
	'/dashboard/quizz': 'Quiz',
	'/dashboard/utilisateurs': 'Utilisateurs',
};

function getPageTitle(pathname: string): string {
	for (const [path, title] of Object.entries(PAGE_TITLES)) {
		if (pathname === path || pathname.endsWith(path) || pathname.includes(path + '/')) {
			return title;
		}
	}
	return 'OnMec';
}

export function SiteHeader() {
	const pathname = usePathname();
	const title = getPageTitle(pathname);

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">{title}</h1>
				<div className="ml-auto flex items-center gap-2">
					<ThemeSwitch />
					<IconBell className="size-5" />
				</div>
			</div>
		</header>
	);
}
