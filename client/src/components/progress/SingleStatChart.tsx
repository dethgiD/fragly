"use client";

import React, { JSX, useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    ReferenceLine, Label // Import Label from recharts
} from 'recharts';
import { FormattedChartDataPoint, UserProgressStat } from '@/types/progress';
import { formatStatValue } from '@/utils/formatting';
import { formatMapName } from '@/utils/mapImages';
import { RankTierKey, RankTierAverages, REFERENCE_LINE_COLORS, RANK_TIERS_FOR_SELECTION } from '@/data/rankAverages';


const CustomTooltip = ({ active, payload, label }: any): JSX.Element | null => {
    if (active && payload && payload.length) {
        const matchIndex = label + 1;
        const dataPoint = payload[0].payload as FormattedChartDataPoint;
        const statKey = payload[0].dataKey as keyof UserProgressStat;
        const statName = payload[0].name;
        const originalValue = dataPoint[statKey];

        return (
            <div className="bg-neutral-800 border border-neutral-700 p-3 rounded shadow-lg text-sm text-neutral-200 max-w-xs">
                <p className="font-semibold mb-1">Match {matchIndex}</p>
                <p className="text-xs text-neutral-400 mb-2">Map: {formatMapName(dataPoint.mapName)}</p>
                <p style={{ color: payload[0].color }}>
                    {`${statName}: `}
                    {formatStatValue(statKey, originalValue)}
                </p>
                <p className="text-xs text-neutral-400 mt-2">{new Date(dataPoint.playedAt).toLocaleDateString()}</p>
            </div>
        );
    }
    return null;
};


interface SingleStatChartProps {
    statKey: keyof UserProgressStat;
    statLabel: string;
    chartData: FormattedChartDataPoint[];
    chartColor?: string;
    averageRankData: Record<RankTierKey, RankTierAverages>;
    selectedRankTiers: RankTierKey[];
}

export default function SingleStatChart({
    statKey,
    statLabel,
    chartData,
    chartColor = "#38bdf8",
    averageRankData,
    selectedRankTiers
}: SingleStatChartProps) {

    const yAxisTickFormatter = (value: any): string => {
        if (typeof value !== 'number') return String(value);

        switch (statKey) {
            case 'accuracy':
            case 'accuracySpotted':
            case 'hsAccuracy':
            case 'counterStrafing':
            case 'tradeKillPercentage':
            case 'tradedDeathPercentage':
            case 'multiKillPercentage':
                return `${value.toFixed(1)}%`;
            case 'timeToDamage':
                return `${Math.round(value * 1000)}ms`;
            case 'crosshairPlacement':
                return `${value.toFixed(1)}°`;
            case 'kdr':
                return value.toFixed(2);
            default:
                return value.toFixed(0);
        }
    };

    if (!chartData || chartData.length < 2) {
        return (
            <div className="bg-neutral-900 p-4 md:p-6 rounded-lg border border-neutral-800 shadow-md flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-base font-semibold mb-4 text-sky-300 text-center">{statLabel}</h3>
                <p className="text-neutral-500 italic text-center text-sm">
                    {chartData && chartData.length === 1 ? "Need at least two matches to show progress." : "Not enough data."}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-neutral-900 p-4 md:pb-6 md:pt-4 md:px-2 rounded-lg border border-neutral-800 shadow-md">
             {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}

             <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 35, left: 15, bottom: 25 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis
                        dataKey="matchIndex"
                        tickFormatter={(index) => `M${index + 1}`}
                        stroke="#a3a3a3"
                        tick={{ fontSize: 11 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        stroke="#a3a3a3"
                        tick={{ fontSize: 11 }}
                        tickFormatter={yAxisTickFormatter}
                        domain={['auto', 'auto']}
                        width={55}
                        allowDecimals={true}
                     />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="top"
                        align="center"
                        wrapperStyle={{paddingBottom: '15px'}}
                        payload={[{ value: statLabel, type: 'line', id: statKey, color: chartColor }]}
                    />
                    <Line
                        key={statKey}
                        type="monotone"
                        dataKey={statKey}
                        name={statLabel}
                        stroke={chartColor}
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 1, fill: chartColor }}
                        activeDot={{ r: 6, strokeWidth: 2, fill: chartColor }}
                        connectNulls
                    />

                    {selectedRankTiers.map((tierKey, index) => {
                        const avgValue = averageRankData[tierKey]?.[statKey];
                        if (avgValue != null) {
                             const tierInfo = RANK_TIERS_FOR_SELECTION.find(t => t.key === tierKey);
                             const lineLabel = `Avg ${tierInfo?.label || tierKey}`;
                             const lineColor = REFERENCE_LINE_COLORS[index % REFERENCE_LINE_COLORS.length];

                            return (
                                <ReferenceLine
                                    key={`ref-${tierKey}-${statKey}`}
                                    y={avgValue}
                                    stroke={lineColor}
                                    strokeDasharray="4 4"
                                    strokeWidth={1.5}
                                    label={{ // Use the label prop directly
                                        value: lineLabel,
                                        position: "right",
                                        fill: lineColor,
                                        fontSize: 10,
                                        fontWeight: 500,
                                        // dx: 5 // Optional horizontal offset if needed
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}