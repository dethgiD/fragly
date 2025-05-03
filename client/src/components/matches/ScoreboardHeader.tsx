// components/matches/ScoreboardHeader.tsx
import { SortConfig, PlayerStatEntry } from '@/types/match'; // Adjust path
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; // npm install @heroicons/react

type ScoreboardHeaderProps = {
    columns: { key: keyof PlayerStatEntry; label: string; sortable: boolean, numeric?: boolean }[];
    sortConfig: SortConfig;
    onSort: (key: keyof PlayerStatEntry) => void;
};

export default function ScoreboardHeader({ columns, sortConfig, onSort }: ScoreboardHeaderProps) {
    const renderSortIcon = (key: keyof PlayerStatEntry) => {
        if (sortConfig.key !== key) {
            // Subtle indicator that it's sortable
            return <span className="inline-block w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors"><ChevronDownIcon /></span>;
        }
        if (sortConfig.direction === 'asc') {
            return <span className="inline-block w-4 h-4 text-sky-400"><ChevronUpIcon /></span>;
        }
        return <span className="inline-block w-4 h-4 text-sky-400"><ChevronDownIcon /></span>;
    };

    return (
        <thead className="bg-neutral-800/50 text-xs uppercase text-neutral-400 sticky top-0 z-10">
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key}
                        scope="col"
                        className={`px-4 py-3 ${col.numeric ? 'text-right' : 'text-left'} ${col.sortable ? 'cursor-pointer group transition-colors hover:bg-neutral-700/50 hover:text-neutral-200' : ''}`}
                        onClick={() => col.sortable && onSort(col.key)}
                        aria-sort={sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                        <div className={`flex items-center ${col.numeric ? 'justify-end' : 'justify-start'} gap-1`}>
                             {col.label}
                            {col.sortable && renderSortIcon(col.key)}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}