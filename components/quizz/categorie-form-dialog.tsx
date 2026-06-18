"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Textarea,
} from "@heroui/react";
import {
	CategorieQuizCreateDTO,
	CategorieQuizSchema,
} from "@/features/quizz/schema/categorie-quiz.schema";
import { ICategorieQuiz } from "@/features/quizz/types/quizz.type";
import { useAjouterCategorieQuizzMutation } from "@/features/quizz/queries/categorie-add.mutation";
import { useModifierCategorieQuizzMutation } from "@/features/quizz/queries/categorie-update.mutation";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	categorie?: ICategorieQuiz | null;
};

export default function CategorieFormDialog({ isOpen, onClose, categorie }: Props) {
	const isEdit = Boolean(categorie?.id);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CategorieQuizCreateDTO>({
		resolver: zodResolver(CategorieQuizSchema),
		defaultValues: { nom: "", description: "" },
	});

	useEffect(() => {
		if (isOpen) {
			reset({
				nom: categorie?.nom ?? "",
				description: categorie?.description ?? "",
			});
		}
	}, [isOpen, categorie, reset]);

	const { mutateAsync: ajouter, isPending: isAdding } = useAjouterCategorieQuizzMutation();
	const { mutateAsync: modifier, isPending: isUpdating } = useModifierCategorieQuizzMutation();

	const isLoading = isAdding || isUpdating;

	const onSubmit = async (data: CategorieQuizCreateDTO) => {
		if (isEdit && categorie?.id) {
			await modifier({ id: categorie.id, data }, { onSuccess: () => onClose() });
		} else {
			await ajouter({ data }, { onSuccess: () => onClose() });
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} placement="center">
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						{isEdit ? "Modifier la catégorie" : "Nouvelle catégorie"}
					</ModalHeader>
					<ModalBody className="space-y-2">
						<div>
							<Input
								label="Nom"
								placeholder="Nom de la catégorie"
								variant="bordered"
								{...register("nom")}
								isInvalid={Boolean(errors.nom)}
								errorMessage={errors.nom?.message}
							/>
						</div>
						<div>
							<Textarea
								label="Description"
								placeholder="Description (optionnelle)"
								variant="bordered"
								{...register("description")}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button variant="light" type="button" onPress={onClose} disabled={isLoading}>
							Annuler
						</Button>
						<Button color="primary" type="submit" isLoading={isLoading}>
							{isEdit ? "Enregistrer" : "Créer"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
