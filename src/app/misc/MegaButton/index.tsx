import {
	cloneElement,
	ReactElement,
	ReactNode,
	useMemo,
	useState,
} from 'react';
import Item from './Item';
import Icon from './Icon';

interface MegaButtonProps {
	container?: ReactElement<{
		className?: string;
		onOver?: () => void;
		onOut?: () => void;
	}>;
	containerProps?: Record<string, any>;
	children?: ReactNode;
	icon?: ReactElement<{ className?: string }>;
}

const MegaButton = ({
	container,
	containerProps = {},
	children,
	icon,
}: MegaButtonProps) => {
	const [isOver, setIsOver] = useState(false);

	if (!container) container = <button type='button' />;

	const defaultClassName = 'indicator gap-0 btn items-stretch h-auto p-0';

	const mergedClassName = useMemo(
		() =>
			containerProps.className
				? `${defaultClassName} ${containerProps.className ?? ''}`.trim()
				: defaultClassName,
		[containerProps.className]
	);

	const wrappedChildren = useMemo(
		() =>
			Array.isArray(children) ? (
				children.map((child, k) => (
					<Item
						key={k}
						first={k === 0}
						isOver={isOver}>
						{child}
					</Item>
				))
			) : (
				<Item isOver={isOver}>{children}</Item>
			),
		[isOver, children]
	);

	return cloneElement(
		container,
		{
			...containerProps,
			className: mergedClassName,
			onOver: () => setIsOver(true),
			onOut: () => setIsOver(false),
		},
		<>
			{wrappedChildren}
			{icon ? <Icon isOver={isOver}>{icon}</Icon> : null}
		</>
	);
};
export default MegaButton;
