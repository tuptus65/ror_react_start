import { Link, usePage } from '@inertiajs/react';

export default function Pagy() {
    const { pagination } = usePage().props
    const { series, page, previous, next, last } = pagination;

    if (series.length <= 1) return null;

    const navBtnClass = (isDisabled) => `
    px-3 py-2 rounded-md border text-sm transition-colors
    ${isDisabled
        ? 'text-gray-300 border-gray-100 pointer-events-none'
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
    }
  `;

    return (
        <nav className="flex items-center justify-center space-x-1 mt-6">
            {/* Pierwsza strona (<<) */}
            <Link
                href="?page=1"
                preserveScroll
                className={navBtnClass(page === 1)}
            >
                &laquo;&laquo;
            </Link>

            {/* Poprzednia (<) */}
            <Link
                href={previous ? `?page=${previous}` : '#'}
                preserveScroll
                className={navBtnClass(!previous)}
            >
                &lsaquo;
            </Link>

            {/* Mapowanie serii stron */}
            {series.map((item, index) => {
                if (item === 'gap') {
                    return (
                        <span key={`gap-${index}`} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                    );
                }

                const isCurrent = Number(item) === Number(page);

                return (
                    <Link
                        key={index}
                        href={`?page=${item}`}
                        preserveScroll
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                            isCurrent
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {item}
                    </Link>
                );
            })}

            {/* Następna (>) */}
            <Link
                href={next ? `?page=${next}` : '#'}
                preserveScroll
                className={navBtnClass(!next)}
            >
                &rsaquo;
            </Link>

            {/* Ostatnia strona (>>) */}
            <Link
                href={`?page=${last}`}
                preserveScroll
                className={navBtnClass(page === last)}
            >
                &raquo;&raquo;
            </Link>
        </nav>
    );
}
