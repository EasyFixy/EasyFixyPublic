import React from "react";

interface CommonInputProps {
    label: string;
    type: 'text' | 'number' | 'email' |'password' | 'date';
    value: string | number | undefined ;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    required: boolean;
    isPassword?: boolean;
    showPassword?: boolean;
    margin?: boolean
  }
const CommonInput = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    name,
    required = false,
    isPassword = false,
    showPassword = false,
    margin = true

}:CommonInputProps) => {
    return(
        <div className={`w-full flex flex-col ${margin ? 'mb-6' : ''}`}>
            <label className="text-base"> {label}</label>
            <input 
                className="w-full h-10 border border-solid border-[#666666] text-[#666666] pl-4 relative"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                required ={required}
                
            />
            
        </div>
    );
}
export default CommonInput;