"use client";
import React from 'react';
import {Spinner, Pagination} from "@heroui/react";
import ActualiteCard from "./actualite-card";
import {useActualiteList} from "@/features/actualites/hooks/use-actualite-list";

function ActualitesCardList() {
	const {actualites, meta, isLoading, isError, handlePageChange} = useActualiteList();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-10">
				<Spinner label="Chargement des actualités..."/>
			</div>
		);
	}

	if (isError || !actualites) {
		return (
			<div className="text-center text-danger-500 py-8">
				Impossible de charger les actualités pour le moment.
			</div>
		);
	}

	if (actualites.length === 0) {
		return (
			<div className="text-center text-default-500 py-8">
				Aucune actualité trouvée.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{actualites.map((actualite) => (
					<ActualiteCard key={actualite.id} actualite={actualite}/>
				))}
			</div>
			{meta && meta.totalPages > 1 && (
				<div className="flex justify-center pb-4">
					<Pagination
						total={meta.totalPages}
						page={meta.page}
						onChange={handlePageChange}
						showControls
						color="primary"
					/>
				</div>
			)}
		</div>
	);
}

export default ActualitesCardList;
