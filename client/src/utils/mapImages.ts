// utils/mapImages.ts (or similar helper file)

// List known competitive maps (adjust as needed)
const KNOWN_MAPS = [
    "de_anubis",
    "de_ancient",
    "de_dust2",
    "de_inferno",
    "de_mirage",
    "de_nuke",
    "de_overpass",
    "de_train",
    "de_vertigo",
  ];
  
  const DEFAULT_MAP_IMAGE = "/maps/default.jpg"; // A fallback image
  
  export const getMapImageUrl = (mapName: string | null | undefined): string => {
    if (!mapName) return DEFAULT_MAP_IMAGE;
  
    const normalizedMapName = mapName.toLowerCase(); // Ensure consistent casing
  
    if (KNOWN_MAPS.includes(normalizedMapName)) {
      return `/maps/${normalizedMapName}.jpg`; // Assumes jpg extension
    }
  
    
  
    return DEFAULT_MAP_IMAGE;
  };
  
  // Helper to format map names for display
  export const formatMapName = (mapName: string | null | undefined): string => {
      if (!mapName) return "Unknown Map";
      // Remove "de_" prefix and capitalize
      return mapName.replace(/^de_|^cs_/,'').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }