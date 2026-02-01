'use client';

import { useState } from 'react';
import { SignalementCreateDTO, SignalementUpdateDTO } from '@/features/signalements';
import { ajouterSignalementAction, modifierSignalementAction } from '@/features/signalements';

export interface UseSignalementFormOptions {
	onSuccess?: (message: string) => void;
	onError?: (error: string) => void;
}

/**
 * Hook custom pour gérer les opérations de création et modification de signalements
 */
export const useSignalementForm = (options?: UseSignalementFormOptions) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createSignalement = async (formData: FormData) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await ajouterSignalementAction(formData as unknown as SignalementCreateDTO);

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la création du signalement');
			}

			options?.onSuccess?.(result.message || 'Signalement créé avec succès');
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

	const updateSignalement = async (id: string, formData: FormData) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await modifierSignalementAction(id, formData as unknown as SignalementUpdateDTO);

			if (!result.success) {
				throw new Error(result.message || 'Erreur lors de la modification du signalement');
			}

			options?.onSuccess?.(result.message || 'Signalement modifié avec succès');
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

	const buildFormData = (data: Partial<SignalementCreateDTO> | Partial<SignalementUpdateDTO>) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				if (value instanceof File) {
					formData.append(key, value);
				} else if (typeof value === 'object') {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, String(value));
				}
			}
		});

		return formData;
	};

	return {
		isLoading,
		error,
		setError,
		createSignalement,
		updateSignalement,
		buildFormData,
	};
};
