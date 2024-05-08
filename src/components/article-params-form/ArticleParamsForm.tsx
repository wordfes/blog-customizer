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

type ArticleParamsFormProps = (props: {
	setArticleState: (articleState: ArticleStateType) => void;
}) => JSX.Element;

export const ArticleParamsForm: ArticleParamsFormProps = ({
	setArticleState,
}) => {
	// Ссылка для доступа к DOM-элементу сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Состояние сайдбара открыти или закрыт
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Состояние формы, хранит установленные в ней значения
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Фунция открытия/закрытия сайдбара
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Закрытие сайдбара по клику на оверлей и нажатию кнопки Esc
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

	// Применяем стили заданные в форме к статье
	const submitForm = (evt: React.FormEvent) => {
		evt.preventDefault();
		setArticleState(formState);
	};

	// Сбрасываем состояния форм и страницы к дефолтным
	const resetForm = (evt: React.FormEvent) => {
		evt.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text as={'h3'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontFamilyOption: selected,
							}))
						}
					/>

					<RadioGroup
						title={'размер шрифта'}
						name={'fonst-size'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontSizeOption: selected,
							}))
						}
					/>

					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontColor: selected,
							}))
						}
					/>

					<Separator />

					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								backgroundColor: selected,
							}))
						}
					/>

					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
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
