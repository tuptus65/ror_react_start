export default function Select({
    name,
    options,
    selectedValues,
    onChange,
    multiple = false,
    className = '',
    includeBlank = false,
}) {
    return (
        <select
            id={name}
            name={name}
            value={selectedValues}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            onChange={onChange}
            multiple={multiple}
        >
            {includeBlank && <option value=""></option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
