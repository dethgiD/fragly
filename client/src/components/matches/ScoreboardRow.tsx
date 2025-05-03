// components/matches/ScoreboardRow.tsx

import { PlayerStatEntry } from '@/types/match';
import { formatStatValue } from '@/utils/formatting';
import { getRankBadgeStyle } from '@/utils/rankUtils';
// Import the color utility and StatRanges type
import { getStatColorClass, StatRanges } from '@/utils/colorUtils';

type ScoreboardRowProps = {
    player: PlayerStatEntry;
    columns: { key: keyof PlayerStatEntry; label: string; numeric?: boolean }[];
    isCurrentUser: boolean;
    statRanges: StatRanges; // Add statRanges prop
};

export default function ScoreboardRow({ player, columns, isCurrentUser, statRanges }: ScoreboardRowProps) {
    return (
        <tr className={`border-b border-neutral-800 ${isCurrentUser ? 'bg-sky-900/20 hover:bg-sky-900/30' : 'hover:bg-neutral-800/60'} transition-colors`}>
            {columns.map((col) => {
                const cellValue = player[col.key];
                let textColorClass = isCurrentUser ? 'text-sky-100 font-medium' : 'text-neutral-200'; // Base color

                // Apply color coding for numeric, non-username columns
                if (col.numeric && col.key !== 'username') {
                    const range = statRanges[col.key];
                    textColorClass = getStatColorClass(
                        col.key,
                        cellValue as number | null, // Cast value to number for the function
                        range?.min,
                        range?.max
                    );
                    // Add font-medium if it's the current user, overriding the color class's default weight if necessary
                    if (isCurrentUser) {
                        textColorClass += ' font-medium';
                    }
                }

                // Special handling for username cell (includes rank badge)
                if (col.key === 'username') {
                    const rankBadgeStyle = getRankBadgeStyle(player.rank);
                    const formattedRank = player.rank != null && player.rank > 0
                        ? player.rank.toLocaleString('en-US', { maximumFractionDigits: 0 })
                        : null;

                    return (
                        <td key={col.key} className={`px-4 py-3 text-sm whitespace-nowrap text-left ${isCurrentUser ? 'text-sky-100 font-medium' : 'text-neutral-200'}`}>
                            <div className="flex items-center gap-x-2 justify-start">
                                <span>{player.username}</span>
                                {rankBadgeStyle && formattedRank && (
                                    <span
                                        title={`Premier Rank: ${formattedRank}`}
                                        className={`inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-semibold shadow-sm leading-none ${rankBadgeStyle.bgColor} ${rankBadgeStyle.textColor} border-l-4 ${rankBadgeStyle.borderColor}`}
                                    >
                                        {formattedRank}
                                    </span>
                                )}
                            </div>
                        </td>
                    );
                }

                // Render other cells
                return (
                    <td key={col.key} className={`px-4 py-3 text-sm whitespace-nowrap ${col.numeric ? 'text-right font-mono' : 'text-left'} ${textColorClass}`}>
                        {formatStatValue(col.key, cellValue)}
                    </td>
                );
            })}
        </tr>
    );
}