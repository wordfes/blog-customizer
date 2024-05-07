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
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	console.log(currentArticleState);

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
						selected={currentArticleState.fontFamilyOption}
						onChange={(selected: OptionType) =>
							setCurrentArticleState((oldState) => ({
								...oldState,
								fontFamilyOption: selected,
							}))
						}
					/>

					<RadioGroup
						title={'размер шрифта'}
						name={'fonst-size'}
						options={fontSizeOptions}
						selected={currentArticleState.fontSizeOption}
						onChange={(selected: OptionType) =>
							setCurrentArticleState((oldState) => ({
								...oldState,
								fontSizeOption: selected,
							}))
						}
					/>

					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={currentArticleState.fontColor}
						onChange={(selected: OptionType) =>
							setCurrentArticleState((oldState) => ({
								...oldState,
								fontColor: selected,
							}))
						}
					/>

					<Separator />

					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={currentArticleState.backgroundColor}
						onChange={(selected: OptionType) =>
							setCurrentArticleState((oldState) => ({
								...oldState,
								backgroundColor: selected,
							}))
						}
					/>

					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={currentArticleState.contentWidth}
						onChange={(selected: OptionType) =>
							setCurrentArticleState((oldState) => ({
								...oldState,
								contentWidth: selected,
							}))
						}
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
