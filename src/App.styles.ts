import styled from'styled-components';
import IconButton from '@material-ui/core/IconButton';

//styled componenets
export const StyledWrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    float: right;
    margin-bottom: 20px;
    z-index: 100;
`;