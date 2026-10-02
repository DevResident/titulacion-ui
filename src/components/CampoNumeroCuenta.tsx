import React from "react";
import { TextField } from "@mui/material";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onValidityChange?: (isValidPrefix: boolean) => void;
    label?: string;
    helperText?: string;
    maxLength?: number; // por defecto 9
};

const permitidos = ["1", "306", "307", "308", "309", "310", "311"];

const CampoNumeroCuenta: React.FC<Props> = ({
                                                value,
                                                onChange,
                                                onValidityChange,
                                                label = "Número de cuenta",
                                                helperText,
                                                maxLength = 9,
                                            }) => {
    const sanitized = (raw: string) => raw.replace(/\D/g, "").slice(0, maxLength);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = sanitized(e.target.value);
        onChange(v);
        onValidityChange?.(permitidos.some(p => v.startsWith(p)));
    };

    const isValidPrefix = permitidos.some(p => value.startsWith(p));
    const showError = value.length > 0 && !isValidPrefix;

    return (
        <TextField
            id="numero-cuenta"
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            type="tel"
            value={value}
            onChange={handleChange}
            inputProps={{ maxLength, inputMode: "numeric", pattern: "[0-9]*" }}
            error={showError}
            helperText={showError ? "El número debe iniciar con 1, 306–311." : helperText}
        />
    );
};

export default CampoNumeroCuenta;
