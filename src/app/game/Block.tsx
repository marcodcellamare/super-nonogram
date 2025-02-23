import { useEffect, useMemo, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import { useScale } from '!/contexts/scale';

import { X } from 'lucide-react';

import Config from '!config';

interface BlockProps {
	row: number;
	col: number;
}

const Block = ({ row, col }: BlockProps) => {
	const { grid, setInteraction, interactions, isCompleted, isReady } =
		useEngine();
	const { rows, cols } = useSettings();
	const { isClicked, isInteracting } = useInteraction();
	const { scale } = useScale();

	const [isPointerOver, setIsPointerOver] = useState(false);

	const gridBlock = useMemo(
		() => isReady && grid[row][col],
		[isReady, grid, row, col]
	);

	const hasInteracted = useMemo(
		() => isReady && interactions[row][col],
		[isReady, interactions, row, col]
	);

	const isError = useMemo(
		() =>
			(hasInteracted === 'left' && !gridBlock) ||
			(hasInteracted === 'right' && gridBlock),
		[hasInteracted, gridBlock]
	);

	useEffect(() => {
		if (hasInteracted === false && isPointerOver && isClicked) {
			setInteraction({ row, col, hasInteracted: isInteracting });
		}
	}, [
		row,
		col,
		hasInteracted,
		setInteraction,
		isPointerOver,
		isClicked,
		isInteracting,
	]);

	return (
		<div
			className={`relative aspect-square ${
				row % 5 < 4 && row < rows - 1 ? 'border-b-1' : 'border-b-3'
			} ${
				col % 5 < 4 && col < cols - 1 ? 'border-r-1' : 'border-r-3'
			} border-base-300 text-base-content`}
			style={{
				minWidth: `${Config.game.grid.block.size * scale}rem`,
				minHeight: `${Config.game.grid.block.size * scale}rem`,
			}}>
			<button
				type='button'
				className={`relative block w-full h-full ${
					hasInteracted !== false
						? gridBlock
							? 'bg-accent'
							: 'bg-base-300 inset-shadow-sm inset-shadow-black/15'
						: ''
				}${
					!isCompleted && hasInteracted === false
						? `cursor-pointer bg-base-100 hover:bg-white hover:border-2 ${
								isInteracting === 'left'
									? 'hover:border-accent'
									: 'hover:border-base-content'
						  }`
						: ''
				}${
					isError === true
						? ' border-2 border-error shadow-lg shadow-error z-10'
						: ''
				}`}
				disabled={isCompleted}
				onPointerEnter={() =>
					setIsPointerOver(!isCompleted ? true : false)
				}
				onPointerLeave={() => setIsPointerOver(false)}>
				{(hasInteracted === false && isInteracting === 'right') ||
				(hasInteracted !== false && !gridBlock) ? (
					<span
						className={`absolute top-1/2 left-1/2 -translate-1/2 w-full h-full${
							hasInteracted === false ? ' opacity-10' : ''
						}`}>
						<X className='w-full h-full' />
					</span>
				) : null}
			</button>
		</div>
	);
};
export default Block;
