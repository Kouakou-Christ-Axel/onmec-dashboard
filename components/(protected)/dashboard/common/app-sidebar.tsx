'use client';

import * as React from 'react';
import {useSession} from 'next-auth/react';
import {NavMain} from '@/components/(protected)/dashboard/common/nav-main';
import {NavSecondary} from '@/components/(protected)/dashboard/common/nav-secondary';
import {NavUser} from '@/components/(protected)/dashboard/common/nav-user';
import {Logo} from '@/components/icons';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {siteConfig} from '@/config/site';
import {data} from './data';

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const {data: session} = useSession();

	const user = {
		name: session?.user?.name ?? 'Utilisateur',
		email: session?.user?.email ?? '',
		avatar: '',
	};

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<Logo />
								<span className="text-base font-semibold">
									{siteConfig.name}
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
