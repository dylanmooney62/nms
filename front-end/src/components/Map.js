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
        mapStyle="mapbox://styles/dylanmooney97/ck9bolf7x087k1ir6d2m1gawa?optimize=true"
        mapboxApiAccessToken="pk.eyJ1IjoiZHlsYW5tb29uZXk5NyIsImEiOiJjanZlYjE1eTQxczRyNGRtbWkyeXp2emNuIn0.ByVSX3Yy8z-BFjKAJJYZeg"
        {...viewport}
        onViewportChange={setViewport}
        height={'51.2rem'}
        width={'100%'}
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

  .controls {
    position: absolute;
    right: ${({ theme }) => theme.spacing['3']};
    top: ${({ theme }) => theme.spacing['3']};
  }
`;

export default Map;
