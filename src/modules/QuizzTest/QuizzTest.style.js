import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import backgroundImage from './../../components/assets/ae089ac9-9f10-4266-a64a-cb422b2b45dc.png'; // Đảm bảo đường dẫn hình nền là chính xác

// Styled Components
export const Container = styled.div`
  background-size: cover;
  background-position: center;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  flex-direction: column;
`;

export const Logo = styled.img`
  position: absolute;
  top: 0px;
  left: 20px;
  width: 100px;
  height: auto;
`;

export const Input = styled.input`
  width: 50px;
  height: 20px;
  background-color: #f0f0f0;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const DropArea = styled.span`
  display: inline-block;
  width: 70px;
  height: 20px;
  border-bottom: 1px solid black;
  margin-left: 5px;
  text-align: center;
`;

export const AnswerBox = styled.div`
  display: inline-block;
  padding: 5px;
  margin: 10px 0;
  background-color: ${({ color }) => (color === 'red' ? 'red' : 'gray')};
  color: white;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  width: 60px;
`;

export const ConfettiWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 380px;
`;

export const InstructionsContainer = styled(Box)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 120%;
  background-color: rgba(173, 216, 230, 0.5);
  z-index: 1;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 120%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

export const SubmitButton = styled(Button)`
  position: relative;
  z-index: 2;
  width: 250px;
  height: 60px;
  font-size: 30px;
  margin-right: 30px;
  margin-bottom: 100px;
  font-weight: bold;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #1565c0;
  }
`;

