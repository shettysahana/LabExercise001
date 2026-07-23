import { Autocomplete, Box, TextField } from "@mui/material";
import type { AutocompleteRenderOptionState } from "@mui/material";
import type { AutocompleteOption } from "../model/inventoryData";
import React from "react";

interface AutocompleteDropdownProps<T extends AutocompleteOption> {
    options: readonly T[];
    value: T | null;
    inputValue: string;
    elementId: string;
    label: string;
    noOptionsText: string;
    onChange: (event: React.SyntheticEvent, newValue: T | null) => void;
    onInputChange: (event: React.SyntheticEvent, newInputValue: string) => void;
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T, state: AutocompleteRenderOptionState) => React.ReactNode;
    showFlags?: boolean;
    showPhone?: boolean;
}

export default function AutocompleteDropdown<T extends AutocompleteOption>(props: AutocompleteDropdownProps<T>) {
    const {
        options,
        value,
        inputValue,
        elementId,
        label,
        noOptionsText,
        onChange,
        onInputChange,
        renderOption: customRenderOption,
        showFlags = true,
        showPhone = true
    } = props;

    // Default render option function
    const defaultRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: T) => {
        const { key, ...optionProps } = props as React.HTMLAttributes<HTMLLIElement> & { key: string };
        return (
            <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
            >
                {showFlags && (
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                )}
                {option.label} ({option.code}){showPhone && ` + ${option.phone}`}
            </Box>
        );
    };

    return (
        <Autocomplete
            id={elementId}
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={customRenderOption || defaultRenderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                />
            )}
            value={value}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={onInputChange}
            noOptionsText={noOptionsText}
        />
    );
}