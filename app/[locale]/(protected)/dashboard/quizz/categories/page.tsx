'use client';

import Content from '@/components/primitives/Content';
import Title from '@/components/primitives/Title';
import Subtitle from '@/components/primitives/Subtitle';
import CategoriesListSection from '@/components/quizz/categories-list-section';
import { Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import React from 'react';

export default function QuizzCategoriesPage() {
	return (
		<Content>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Catégories de quiz</Title>
					<Subtitle>Organisez vos quiz par catégories</Subtitle>
				</div>
				<Button
					variant="bordered"
					startContent={<ArrowLeft className="w-4 h-4" />}
					className="mt-4 sm:mt-0"
					as={Link}
					href="/dashboard/quizz"
				>
					Retour aux quiz
				</Button>
			</div>
			<CategoriesListSection />
		</Content>
	);
}
