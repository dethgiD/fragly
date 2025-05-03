// utils/rankUtils.ts

// Interface defining only the style properties
export interface RankBadgeStyle {
    bgColor: string;    // Tailwind background class
    textColor: string;  // Tailwind text class
    borderColor: string;// Tailwind border color for the left bars
  }
  
  // Function now returns only style information based on rank range
  // It also filters out rank 0 or less as per your previous request
  export function getRankBadgeStyle(rank: number | null | undefined): RankBadgeStyle | null {
    // Return null if rank is invalid, null, undefined, or ZERO or less
    if (rank == null || rank <= 0) {
      return null;
    }
  
    const formattedRank = Math.floor(rank); // Use the integer part
  
    if (formattedRank < 5000) {
      return {
        bgColor: 'bg-neutral-600/80',
        textColor: 'text-neutral-100',
        borderColor: 'border-neutral-400',
      };
    }
    if (formattedRank < 10000) {
      return {
        bgColor: 'bg-sky-600/80',
        textColor: 'text-sky-100',
        borderColor: 'border-sky-400',
      };
    }
    if (formattedRank < 15000) {
      return {
        bgColor: 'bg-blue-600/80',
        textColor: 'text-blue-100',
        borderColor: 'border-blue-400',
      };
    }
    if (formattedRank < 20000) {
      return {
        bgColor: 'bg-purple-600/80',
        textColor: 'text-purple-100',
        borderColor: 'border-purple-400',
      };
    }
    if (formattedRank < 25000) {
      return {
        bgColor: 'bg-fuchsia-600/80',
        textColor: 'text-fuchsia-100',
        borderColor: 'border-fuchsia-400',
      };
    }
    if (formattedRank < 30000) {
      return {
        bgColor: 'bg-red-600/80',
        textColor: 'text-red-100',
        borderColor: 'border-red-400',
      };
    }
    // 30,000+
    return {
      bgColor: 'bg-yellow-600/80',
      textColor: 'text-yellow-100',
      borderColor: 'border-yellow-400',
    };
  }