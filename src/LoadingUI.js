import React from 'react';

import LoadingCircle from './LoadingCircle';
import LoadingWrapper from './LoadingWrapper';

const LoadingIndicator = () => (
  <LoadingWrapper>
    <LoadingCircle />
    <LoadingCircle rotate={30} delay={-1.1} />
    <LoadingCircle rotate={60} delay={-1} />
    <LoadingCircle rotate={90} delay={-0.9} />
    <LoadingCircle rotate={120} delay={-0.8} />
    <LoadingCircle rotate={150} delay={-0.7} />
    <LoadingCircle rotate={180} delay={-0.6} />
    <LoadingCircle rotate={210} delay={-0.5} />
    <LoadingCircle rotate={240} delay={-0.4} />
    <LoadingCircle rotate={270} delay={-0.3} />
    <LoadingCircle rotate={300} delay={-0.2} />
    <LoadingCircle rotate={330} delay={-0.1} />
  </LoadingWrapper>
);

export default LoadingIndicator;
