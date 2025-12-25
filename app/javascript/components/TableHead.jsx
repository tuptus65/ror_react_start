export default function TableHead({ children, className = '' }) {
    return (
        <thead
            className={`border-default border-b bg-gray-900 text-white ${className}`}
        >
            {children}
        </thead>
    );
}
