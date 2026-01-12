"use client";
import Content from "@/components/primitives/Content";
import React from 'react';
import ActualitesCardList from "@/components/(protected)/dashboard/actualites/actualites-card-list";
import ActualitesFiltersBar from "@/components/(protected)/dashboard/actualites/actualites-filters-bar";

function ActualitesPage() {
	return (
		<Content>
			<ActualitesFiltersBar/>
			<ActualitesCardList/>
		</Content>
	);
}

export default ActualitesPage;