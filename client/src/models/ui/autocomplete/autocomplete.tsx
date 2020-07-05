import React, { useState, useEffect, memo } from 'react';
import AutocompleteStyle from './autocomplete.module.scss';

interface OwnProps {
    wordsList: string[],
    word: string,
    onCategoryClick: (e: any, value: any) => void
}

interface AutoCompleteState {
    showOptions: boolean;
    filteredOptions: string[];
    activeOption: number;
}

const Autocomplete: React.FC<OwnProps> = (props) => {
    const [AutoComplete, setAutoComplete] = useState<AutoCompleteState>({
        showOptions: false,
        filteredOptions: [],
        activeOption: 0,
    });

    useEffect(() => {
        return () => {
            onChange()
        }
    }, [props.word])

    // Initial filteredOptions array in options
    const onChange = () => {
        const filteredOptions = props.wordsList.filter(
            (optionName) =>
                optionName.toLowerCase().indexOf(props.word.toLowerCase()) > -1
        );

        setAutoComplete({
            ...AutoComplete,
            activeOption: 0,
            filteredOptions: filteredOptions.slice(0, 3),
            showOptions: true,
        });
        //setService({ ...Service, category: userInput });
    };

    // Invoke when user click on category name in autocomplete
    const onCategoryClick = (name: any, title: string) => {
        setAutoComplete({
            ...AutoComplete,
            showOptions: false,
            filteredOptions: []
        });
        props.onCategoryClick(name, 'category');
    };

    // AutoComplete Item
    let optionList;
    if (AutoComplete.showOptions) {
        if (AutoComplete.filteredOptions.length) {
            optionList = (
                <div className={AutocompleteStyle.List}>
                    {AutoComplete.filteredOptions.map((optionName, index) => {
                        return (
                            <p onClick={(e) => onCategoryClick(optionName, optionName)} key={optionName}>
                                {optionName + " "}
                            </p>
                        );
                    })}
                </div>
            );
        }
    }
    if (!props.word) optionList = undefined;
    console.log(props.word);


    return (
        <div className={AutocompleteStyle.Options}>{optionList}</div>
    )
}

export default Autocomplete;