import React from "react";
import { TextField } from "@mui/material";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onValidityChange?: (isValid: boolean) => void;
    label?: string;
    helperText?: string;
    disabled?: boolean;
};

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const CampoCorreoElectronico: React.FC<Props> = ({
                                                     value,
                                                     onChange,
                                                     onValidityChange,
                                                     label = "Correo electrónico",
                                                     helperText,
                                                     disabled,
                                                 }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.trim();
        onChange(v);
        onValidityChange?.(emailRegex.test(v));
    };

    const isValid = value === "" ? true : emailRegex.test(value);

    return (
        <TextField
            id="correo-electronico"
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            value={value}
            onChange={handleChange}
            error={value.length > 0 && !isValid}
            helperText={!isValid ? "Ingresa un correo válido." : helperText}
            disabled={disabled}
        />
    );
};

export default CampoCorreoElectronico;
