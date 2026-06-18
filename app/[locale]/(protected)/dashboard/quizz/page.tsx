import Content from '@/components/primitives/Content';
import QuizzFiltersBar from '@/components/quizz/quizz-filters-bar';
import QuizzList from '@/components/quizz/quizz-list';
import React from 'react';

export default function QuizzPage() {
	return (
		<Content>
			<QuizzFiltersBar />
			<QuizzList />
		</Content>
	);
}
