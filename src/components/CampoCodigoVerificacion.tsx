import React, { useEffect, useRef } from "react";
import { Box, TextField } from "@mui/material";

type Props = {
    length?: number;            // default 6
    value?: string;             // control total desde formulario
    onChange?: (otp: string) => void;
    onComplete?: (otp: string) => void;
    autoFocus?: boolean;
};

const CampoCodigoVerificacion: React.FC<Props> = ({
                                                      length = 6,
                                                      value,
                                                      onChange,
                                                      onComplete,
                                                      autoFocus = true,
                                                  }) => {

    const [local, setLocal] = React.useState<string>("".padEnd(length, " "));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // si es controlado externamente, refleja el valor
    useEffect(() => {
        if (typeof value === "string") {
            const v = value.slice(0, length);
            setLocal(v.padEnd(length, " "));
        }
    }, [value, length]);

    const setAt = (idx: number, char: string) => {
        const arr = (typeof value === "string" ? value.padEnd(length, " ") : local).split("");
        arr[idx] = char;
        const next = arr.join("");
        if (typeof value === "string") {
            onChange?.(next.replace(/\s/g, ""));
        } else {
            setLocal(next);
            onChange?.(next.replace(/\s/g, ""));
        }
        if (next.replace(/\s/g, "").length === length) {
            onComplete?.(next.replace(/\s/g, ""));
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, length);
        text.split("").forEach((c, i) => setAt(i, c));
        const lastIndex = Math.min(text.length, length) - 1;
        if (lastIndex >= 0) inputsRef.current[lastIndex]?.focus();
    };

    return (
        <Box display="flex" gap={1} justifyContent="center" onPaste={handlePaste}>
            {Array.from({ length }).map((_, i) => {
                const char = (typeof value === "string" ? value.padEnd(length, " ") : local)[i]?.trim() || "";
                return (
                    <TextField
                        key={i}
                        inputRef={(el) => (inputsRef.current[i] = el)}
                        value={char}
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (!v) return;
                            setAt(i, v[0]);
                            inputsRef.current[Math.min(i + 1, length - 1)]?.focus();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                                if (char) {
                                    setAt(i, " ");
                                } else if (i > 0) {
                                    inputsRef.current[i - 1]?.focus();
                                    setAt(i - 1, " ");
                                }
                            } else if (e.key === "ArrowLeft" && i > 0) {
                                inputsRef.current[i - 1]?.focus();
                            } else if (e.key === "ArrowRight" && i < length - 1) {
                                inputsRef.current[i + 1]?.focus();
                            }
                        }}
                        slotProps={{
                            input: {
                                inputProps: {
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    maxLength: 1,
                                },
                                sx: { "& input": { textAlign: "center", width: "2.5rem" } },
                            },
                        }}
                        autoFocus={autoFocus && i === 0}
                    />
                );
            })}
        </Box>
    );
};

export default CampoCodigoVerificacion;
