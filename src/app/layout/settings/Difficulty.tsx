import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';

import { Baby, Brain, GraduationCap } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useSettings();
	const difficulties: DifficultyTypes[] = ['easy', 'medium', 'hard'];
	const icons = {
		easy: <Baby className='lucide-text block' />,
		medium: <GraduationCap className='lucide-text bloxk' />,
		hard: <Brain className='lucide-text block' />,
	};

	return (
		<div className='flex flex-wrap gap-0.5'>
			{difficulties.map((d) => {
				return (
					<button
						key={d}
						className='flex-1 btn btn-sm btn-outline btn-primary disabled:!bg-accent disabled:!text-white shadow-none'
						type='button'
						disabled={d === difficulty}
						onClick={() => setDifficulty(d)}>
						<span className='text-xl'>{icons[d]}</span>{' '}
						{i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
