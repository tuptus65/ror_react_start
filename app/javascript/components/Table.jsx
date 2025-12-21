export default function Table({ children, className = '' }) {
    return (
        <div className="relative overflow-x-auto rounded-lg border">
            <table className={`text-body w-full ${className}`}>
                {children}
            </table>
        </div>
    );
}
