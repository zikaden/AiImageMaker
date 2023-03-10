import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <label htmlFor={name}
                    className="block text-sm  text-gray-700">{LabelName}</label>

                {isSurpriseMe && (
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="text-sm font-semibold  bg-[#ecebe7] text-gray-400 py-1 px-2 rounded-[5px]">Surprise Me</button>
                )}
            </div>
            <input type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
                className='bg-gray-50 shadow text-gray-400 text-sm rounded-lg focus:ring-[#fc73e6] focus-border-[#fc73e6] outline-none block w-full p-3' />
        </div>
    )
}

export default FormField