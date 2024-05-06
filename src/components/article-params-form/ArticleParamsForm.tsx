import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	articleParams: ArticleStateType;
};

export const ArticleParamsForm = ({
	articleParams,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		function handleCloseByClick(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		}

		function handleCloseByEsc(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsSidebarOpen(false);
			}
		}

		document.addEventListener('mousedown', handleCloseByClick);
		document.addEventListener('keydown', handleCloseByEsc);

		return () => {
			document.removeEventListener('mousedown', handleCloseByClick);
			document.removeEventListener('keydown', handleCloseByEsc);
		};
	}, []);

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={sidebarRef}>
				<form className={styles.form}>
					<Text as={'h3'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={articleParams.fontFamilyOption}
					/>

					<RadioGroup
						title={'размер шрифта'}
						name={'fonst-size'}
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
					/>

					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={articleParams.fontColor}
					/>

					<Separator />

					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={articleParams.backgroundColor}
					/>

					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={articleParams.contentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
