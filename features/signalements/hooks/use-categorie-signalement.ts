'use client';

import {useState, useEffect} from 'react';
import {
	obtenirTousLesCategoriesAction,
	ajouterCategorieAction,
	modifierCategorieAction,
	supprimerCategorieAction,
} from '@/features/signalements';
import {
	ICategorieSignalement,
	ICreateCategorieSignalement,
	IUpdateCategorieSignalement
} from "@/features/signalements/type/categorie-signalement.types";

export interface UseCategorieSignalementOptions {
	onSuccess?: (message: string) => void;
	onError?: (error: string) => void;
}

/**
 * Hook custom pour gérer les catégories de signalements
 */
export const useCategorieCategorieSignalement = (options?: UseCategorieSignalementOptions) => {
	const [categories, setCategories] = useState<ICategorieSignalement[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Récupère toutes les catégories
	 */
	const loadCategories = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await obtenirTousLesCategoriesAction();

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la récupération des catégories');
			}

			setCategories(result.data || []);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Une erreur est survenue';
			setError(message);
			options?.onError?.(message);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Crée une nouvelle catégorie
	 */
	const createCategorie = async (data: ICreateCategorieSignalement) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await ajouterCategorieAction(data);

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la création de la catégorie');
			}

			// Ajouter la nouvelle catégorie à la liste
			setCategories([...categories, result.data!]);
			options?.onSuccess?.(result.message || 'Catégorie créée avec succès');
			return result.data;
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Une erreur est survenue';
			setError(message);
			options?.onError?.(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Met à jour une catégorie existante
	 */
	const updateCategorie = async (id: string, data: IUpdateCategorieSignalement) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await modifierCategorieAction(id, data);

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la modification de la catégorie');
			}

			// Mettre à jour la catégorie dans la liste
			setCategories(
				categories.map((cat) => (cat.id === id ? result.data! : cat))
			);
			options?.onSuccess?.(result.message || 'Catégorie modifiée avec succès');
			return result.data;
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Une erreur est survenue';
			setError(message);
			options?.onError?.(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Supprime une catégorie
	 */
	const deleteCategorie = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await supprimerCategorieAction(id);

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la suppression de la catégorie');
			}

			// Supprimer la catégorie de la liste
			setCategories(categories.filter((cat) => cat.id !== id));
			options?.onSuccess?.(result.message || 'Catégorie supprimée avec succès');
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Une erreur est survenue';
			setError(message);
			options?.onError?.(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	// Charger les catégories au premier rendu
	useEffect(() => {
		loadCategories();
	}, []);

	return {
		// État
		categories,
		isLoading,
		error,
		setError,

		// Opérations
		loadCategories,
		createCategorie,
		updateCategorie,
		deleteCategorie,
	};
};
