import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { cleanSeed } from '!/utils/misc';

import { CheckIcon, RefreshCcwIcon } from 'lucide-react';

const Seed = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { i18n } = useTranslation();
	const { seed, setSeed, isRefreshing } = useSettings();
	const [value, setValue] = useState('');
	const [spin, setSpin] = useState(false);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			setSeed(value);

			e.preventDefault();
			inputRef.current?.blur();
		},
		[value, setSeed]
	);

	useEffect(() => {
		setValue(seed);
	}, [seed]);

	return (
		<form
			className='flex flex-col sm:flex-row gap-1'
			onSubmit={handleSubmit}>
			<label className='input input-primary w-full'>
				<strong className='text-accent'>{i18n.t('seed')}</strong>
				<input
					ref={inputRef}
					type='text'
					value={value}
					disabled={isRefreshing || spin}
					onChange={(e) => setValue(cleanSeed(e.target.value))}
					onFocus={() => setValue('')}
					onBlur={(e) => {
						if (e.target.value.trim().length === 0) {
							setValue(seed);
						}
					}}
				/>
				<button
					type='button'
					className={`cursor-pointer transition-[color] duration-400 ${
						!spin
							? 'text-accent hover:text-accent/50'
							: 'text-secondary'
					}`}
					onClick={() => {
						if (!isRefreshing && !spin) {
							setSeed();
							setSpin(true);
						}
					}}
					disabled={spin}>
					<RefreshCcwIcon
						className={`w-full pointer-events-none duration-500 ${
							isRefreshing || spin
								? 'transition-[rotate] -rotate-360'
								: 'transition-none rotate-0'
						}`}
						onTransitionEnd={() => setSpin(false)}
					/>
				</button>
			</label>
			<button
				type='submit'
				className='btn btn-primary'
				disabled={value.length === 0 || value === seed}>
				<CheckIcon className='w-full' />
			</button>
		</form>
	);
};
export default Seed;
