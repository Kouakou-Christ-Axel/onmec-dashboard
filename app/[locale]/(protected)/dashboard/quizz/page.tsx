import Content from '@/components/primitives/Content';
import Title from '@/components/primitives/Title';
import Subtitle from '@/components/primitives/Subtitle';
import {Button} from '@heroui/react';
import {Plus} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import React from 'react';

export default function QuizzPage() {
	return (
		<Content>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Quiz</Title>
					<Subtitle>Gérez les quiz de sensibilisation citoyenne</Subtitle>
				</div>
				<Button
					color="primary"
					startContent={<Plus className="w-4 h-4" />}
					className="mt-4 sm:mt-0"
					as={Link}
					href="/dashboard/quizz/ajouter"
				>
					Créer un quiz
				</Button>
			</div>
			<div className="flex flex-col items-center justify-center py-20 text-center text-default-400">
				<p className="text-lg font-medium">Aucun quiz pour le moment</p>
				<p className="text-sm mt-1">Créez votre premier quiz pour sensibiliser les citoyens.</p>
			</div>
		</Content>
	);
}
