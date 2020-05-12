import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import styled from 'styled-components';

const StyledLogo = styled(Logo)`
  height: ${({ theme }) => theme.spacing['7']};
`;

export default StyledLogo;
