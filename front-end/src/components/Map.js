import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import styled from 'styled-components';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.946945,
    longitude: -3.19,
    zoom: 13,
  });

  return (
    <StyledMap>
      <ReactMapGL
        className="map"
        mapStyle="mapbox://styles/dylanmooney97/ck9bolf7x087k1ir6d2m1gawa?optimize=true"
        mapboxApiAccessToken="pk.eyJ1IjoiZHlsYW5tb29uZXk5NyIsImEiOiJjanZlYjE1eTQxczRyNGRtbWkyeXp2emNuIn0.ByVSX3Yy8z-BFjKAJJYZeg"
        {...viewport}
        onViewportChange={setViewport}
        width={'100%'}
        height={'100%'}
      >
        <div className="controls">
          <NavigationControl />
        </div>
      </ReactMapGL>
    </StyledMap>
  );
};

const StyledMap = styled.div`
  width: 100%;
  position: relative;
  height: 52.2rem;

  @media (max-width: 768px) {
    height: 42.2rem;
  }

  .controls {
    position: absolute;
    right: ${({ theme }) => theme.spacing['3']};
    top: ${({ theme }) => theme.spacing['3']};
  }
`;

export default Map;
