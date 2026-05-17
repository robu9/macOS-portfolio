'use client';
import React, { useState } from 'react';

export const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const handleDigit = (digit: string) => {
        if (waitingForNewValue) {
            setDisplayValue(digit);
            setWaitingForNewValue(false);
        } else {
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    };

    const handleDecimal = () => {
        if (waitingForNewValue) {
            setDisplayValue('0.');
            setWaitingForNewValue(false);
        } else if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const handleClear = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
    };

    const handleToggleSign = () => {
        setDisplayValue(String(parseFloat(displayValue) * -1));
    };

    const handlePercentage = () => {
        setDisplayValue(String(parseFloat(displayValue) / 100));
    };

    const calculate = (a: number, b: number, op: string) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return a / b;
            default: return b;
        }
    };

    const handleOperator = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForNewValue) {
            setOperator(nextOperator);
            return;
        }

        if (previousValue == null) {
            setPreviousValue(displayValue);
        } else if (operator) {
            const currentValue = previousValue || '0';
            const newValue = calculate(parseFloat(currentValue), inputValue, operator);
            setDisplayValue(String(newValue));
            setPreviousValue(String(newValue));
        }

        setWaitingForNewValue(true);
        setOperator(nextOperator);
    };

    const handleEqual = () => {
        if (!operator || previousValue == null) return;
        
        const inputValue = parseFloat(displayValue);
        const newValue = calculate(parseFloat(previousValue), inputValue, operator);
        
        setDisplayValue(String(newValue));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(true);
    };

    // Format display value for long numbers
    const formattedDisplay = () => {
        if (displayValue.length > 9) {
            return parseFloat(displayValue).toExponential(5);
        }
        return displayValue;
    };

    const operatorClass = "bg-[#ff9f0a] text-white hover:bg-[#f39c12] active:bg-[#e67e22]";
    const topRowClass = "bg-[#a5a5a5] text-black hover:bg-[#8e8e8e] active:bg-[#7b7b7b]";

    return (
        <div className="w-full h-full min-h-[400px] flex flex-col bg-[#1c1c1e] text-white select-none relative pt-4">
            {/* Display Area */}
            <div className="flex-1 w-full px-6 flex items-end justify-end pb-4 font-light overflow-hidden">
                <span className="text-[4.5rem] leading-none tracking-tight break-all text-right" style={{ fontSize: displayValue.length > 7 ? '3rem' : '4.5rem' }}>
                    {formattedDisplay()}
                </span>
            </div>

            {/* Keypad */}
            <div className="w-full px-4 pb-6">
                <div className="grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
                    {/* Row 1 */}
                    <CalcButton label={displayValue === '0' ? 'AC' : 'C'} onClick={handleClear} className={topRowClass} />
                    <CalcButton label="+/-" onClick={handleToggleSign} className={topRowClass} />
                    <CalcButton label="%" onClick={handlePercentage} className={topRowClass} />
                    <CalcButton label="÷" onClick={() => handleOperator('÷')} className={operatorClass} active={operator === '÷' && waitingForNewValue} />

                    {/* Row 2 */}
                    <CalcButton label="7" onClick={() => handleDigit('7')} />
                    <CalcButton label="8" onClick={() => handleDigit('8')} />
                    <CalcButton label="9" onClick={() => handleDigit('9')} />
                    <CalcButton label="×" onClick={() => handleOperator('×')} className={operatorClass} active={operator === '×' && waitingForNewValue} />

                    {/* Row 3 */}
                    <CalcButton label="4" onClick={() => handleDigit('4')} />
                    <CalcButton label="5" onClick={() => handleDigit('5')} />
                    <CalcButton label="6" onClick={() => handleDigit('6')} />
                    <CalcButton label="-" onClick={() => handleOperator('-')} className={operatorClass} active={operator === '-' && waitingForNewValue} />

                    {/* Row 4 */}
                    <CalcButton label="1" onClick={() => handleDigit('1')} />
                    <CalcButton label="2" onClick={() => handleDigit('2')} />
                    <CalcButton label="3" onClick={() => handleDigit('3')} />
                    <CalcButton label="+" onClick={() => handleOperator('+')} className={operatorClass} active={operator === '+' && waitingForNewValue} />

                    {/* Row 5 */}
                    <div className="col-span-2">
                        <CalcButtonWide label="0" onClick={() => handleDigit('0')} />
                    </div>
                    <CalcButton label="." onClick={handleDecimal} />
                    <CalcButton label="=" onClick={handleEqual} className={operatorClass} />
                </div>
            </div>
        </div>
    );
};

// Button components for cleaner JSX
const CalcButton = ({ 
    label, 
    onClick, 
    className = "bg-[#d4d4d2] dark:bg-[#333333] text-black dark:text-white hover:bg-[#c4c4c2] dark:hover:bg-[#4d4d4d]",
    active = false
}: { 
    label: string, 
    onClick: () => void, 
    className?: string,
    active?: boolean
}) => (
    <button 
        onClick={onClick}
        className={`w-full aspect-square md:aspect-auto md:h-12 rounded-full text-2xl font-light focus:outline-none transition-colors duration-150 ${className} ${active ? 'border-2 border-black/20 dark:border-white/20' : ''}`}
    >
        {label}
    </button>
);

const CalcButtonWide = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="w-full h-full rounded-full bg-[#d4d4d2] dark:bg-[#333333] text-black dark:text-white hover:bg-[#c4c4c2] dark:hover:bg-[#4d4d4d] text-2xl font-light focus:outline-none flex items-center pl-8 transition-colors duration-150"
    >
        {label}
    </button>
);
