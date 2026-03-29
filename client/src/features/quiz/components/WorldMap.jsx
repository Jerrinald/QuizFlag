import { geoArea, geoCentroid } from 'd3-geo';
import { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
const SMALL_THRESHOLD = 0.0005;

function WorldMap({ highlightedNumericIso }) {
  const [geos, setGeos] = useState([]);

  const { center, zoom } = useMemo(() => {
    const highlighted = geos.find((g) => g.id === highlightedNumericIso);
    if (!highlighted) return { center: [0, 0], zoom: 1 };

    const area = geoArea(highlighted);
    if (area >= SMALL_THRESHOLD) return { center: [0, 0], zoom: 1 };

    return { center: geoCentroid(highlighted), zoom: 3 };
  }, [geos, highlightedNumericIso]);

  return (
    <ComposableMap
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 175 }}
      className="w-full h-auto border border-gray-300 rounded-sm shadow-md"
    >
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => {
            if (geos.length === 0 && geographies.length > 0) {
              setGeos(geographies);
            }
            return geographies.map((geo) => {
              const isHighlighted = geo.id === highlightedNumericIso;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? '#2563EB' : '#D1D5DB'}
                  stroke={isHighlighted ? '#000' : '#FFF'}
                  strokeWidth={isHighlighted ? 1 : 0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            });
          }}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default WorldMap;
