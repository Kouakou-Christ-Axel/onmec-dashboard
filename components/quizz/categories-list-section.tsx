"use client";

import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Spinner,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@heroui/react";
import { Pencil, Plus, Trash } from "lucide-react";
import { useCategoriesQuizzQuery } from "@/features/quizz/queries/categories-list.query";
import { useSupprimerCategorieQuizzMutation } from "@/features/quizz/queries/categorie-delete.mutation";
import { ICategorieQuiz } from "@/features/quizz/types/quizz.type";
import CategorieFormDialog from "./categorie-form-dialog";

export default function CategoriesListSection() {
	const { data: categories, isLoading, isError, error } = useCategoriesQuizzQuery();
	const { mutateAsync: supprimer, isPending: isDeleting } = useSupprimerCategorieQuizzMutation();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selected, setSelected] = useState<ICategorieQuiz | null>(null);
	const [toDelete, setToDelete] = useState<ICategorieQuiz | null>(null);

	const openCreate = () => {
		setSelected(null);
		setIsFormOpen(true);
	};

	const openEdit = (categorie: ICategorieQuiz) => {
		setSelected(categorie);
		setIsFormOpen(true);
	};

	const confirmDelete = async () => {
		if (!toDelete?.id) return;
		await supprimer({ id: toDelete.id }, { onSuccess: () => setToDelete(null) });
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-default-500">
					{categories?.length ?? 0} catégorie(s)
				</p>
				<Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={openCreate}>
					Nouvelle catégorie
				</Button>
			</div>

			<Table aria-label="Liste des catégories de quiz" isStriped>
				<TableHeader>
					<TableColumn>NOM</TableColumn>
					<TableColumn>DESCRIPTION</TableColumn>
					<TableColumn align="end">ACTIONS</TableColumn>
				</TableHeader>
				<TableBody
					isLoading={isLoading}
					loadingContent={<Spinner label="Chargement..." />}
					emptyContent={isError ? (error?.message || "Erreur de chargement") : "Aucune catégorie"}
				>
					{(categories ?? []).map((categorie) => (
						<TableRow key={categorie.id}>
							<TableCell className="font-medium">{categorie.nom}</TableCell>
							<TableCell className="text-default-500">
								{categorie.description || "—"}
							</TableCell>
							<TableCell>
								<div className="flex justify-end gap-2">
									<Button
										size="sm"
										variant="flat"
										isIconOnly
										onPress={() => openEdit(categorie)}
									>
										<Pencil className="w-4 h-4" />
									</Button>
									<Button
										size="sm"
										variant="flat"
										color="danger"
										isIconOnly
										onPress={() => setToDelete(categorie)}
									>
										<Trash className="w-4 h-4" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Dialogue création / édition */}
			<CategorieFormDialog
				isOpen={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				categorie={selected}
			/>

			{/* Confirmation de suppression */}
			<Modal isOpen={Boolean(toDelete)} onClose={() => setToDelete(null)} placement="center">
				<ModalContent>
					<ModalHeader>Supprimer la catégorie</ModalHeader>
					<ModalBody>
						<p>
							Voulez-vous vraiment supprimer la catégorie{" "}
							<strong>{toDelete?.nom}</strong> ? Cette action est irréversible.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button variant="light" onPress={() => setToDelete(null)} disabled={isDeleting}>
							Annuler
						</Button>
						<Button color="danger" onPress={confirmDelete} isLoading={isDeleting}>
							Supprimer
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}
