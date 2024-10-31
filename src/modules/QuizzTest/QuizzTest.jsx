import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import ReactConfetti from "react-confetti";
import logo from "./../../components/assets/Vector_-Logo-IELTS-1984-1-7.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Animation from "./../../components/Animation/Animation";
import {
  Container,
  Logo,
  Input,
  DropArea,
  AnswerBox,
  ConfettiWrapper,
  InstructionsContainer,
  Overlay,
  BackgroundImage,
  SubmitButton,
} from "./QuizzTest.style";
import { getQuizz } from "./../../apis/quizzApi";
import { useQuery } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default function QuizzTest() {
  const [inputValue, setInputValue] = useState("");
  const [droppedAnswers, setDroppedAnswers] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Effect to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Enable scrolling when component unmounts
    };
  }, []);
  // const quizzData = {
  //   cauHoi: {
  //     doanVan: "The sky is [_input] and the grass is [_input]. You should drag the word <span style='color: red;'>green</span> to the correct blank.",
  //     blanks: [
  //       { id: 1, position: "first", correctAnswer: "blue", type: "input" },
  //       { id: 2, position: "second", correctAnswer: "green", type: "drag" }
  //     ],
  //     dragWords: [
  //       { word: "blue", color: "default", id: 1 },
  //       { word: "green", color: "red", id: 2 },
  //       { word: "yellow", color: "default", id: 3 },
  //       { word: "red", color: "default", id: 4 }
  //     ]
  //   }
  // };
  // Sử dụng useQuery để lấy dữ liệu

  const {
    data: quizzArr = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["quizzArr"], // Sử dụng queryKey để xác định truy vấn
    queryFn: getQuizz, // Sử dụng queryFn để chỉ định hàm lấy dữ liệu
  });
  // Chuyển đổi từ mảng sang đối tượng do dịnh dạng ban đầu dùng test là đối tượng
  const quizzData = quizzArr[0]; // Lấy đối tượng đầu tiên từ mảng
  // Kiểm tra trạng thái loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // // Kiểm tra lỗi
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    const isAnswerCorrect =
      inputValue === quizzData.question.blanks[0].correctAnswer &&
      droppedAnswers[2]?.word === quizzData.question.blanks[1].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);
    if (isAnswerCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  };
  const handleStop = (e, item) => {
    const dropArea = document.getElementById("drop-area");
    const rect = dropArea.getBoundingClientRect();
    const isInDropZone =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (
      isInDropZone &&
      item.word === quizzData.question.blanks[1].correctAnswer
    ) {
      setDroppedAnswers((prev) => ({
        ...prev,
        [item.id]: item,
      }));
      setIsLocked(true);
    }
  };
  const renderParagraph = () => {
    const paragraphParts = quizzData.question.paragraph.split("[_input]");
    return (
      <>
        {paragraphParts[0]}
        <Input
          type="text"
          placeholder="[_input]"
          value={inputValue}
          onChange={handleInputChange}
          disabled={inputValue === quizzData.question.blanks[0].correctAnswer}
        />
        {paragraphParts[1]}
        <DropArea id="drop-area">
          {droppedAnswers[2] ? (
            <AnswerBox color={droppedAnswers[2].color}>
              {droppedAnswers[2].word}
            </AnswerBox>
          ) : (
            "[_input]"
          )}
        </DropArea>
        <span
          dangerouslySetInnerHTML={{
            __html:
              '. You should drag the word <span style="color: red;">green</span>',
          }}
        />
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Logo src={logo} alt="Logo" />
        {/* Hieu ung */}
        {showConfetti && <ReactConfetti />}
        <ConfettiWrapper>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "800",
              width: "800px",
              marginTop: "40px",
              textAlign: "center",
              fontSize: "60px",
              color: "#d32f2f",
              textShadow: "4px 4px 6px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                color: "#c62828",
                textShadow: "6px 6px 8px rgba(0, 0, 0, 0.6)",
              },
            }}
          >
            Vocabulary Practice Game
          </Typography>
        </ConfettiWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            marginTop: "160px",
            marginLeft: "275px",
          }}
        >
          <p style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>Question: </span>
            {renderParagraph()}
          </p>
          <div
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              right: "740px",
              top: "200px",
            }}
          >
            <Animation />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
              marginRight: "60px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", mr: 1 }}>
              Answers List
            </Typography>
            <div
              style={{
                width: "100px",
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              {quizzData.question.dragWords.map((word) => (
                <Draggable
                  key={word.id}
                  onStop={(e) => handleStop(e, word)}
                  disabled={isLocked || droppedAnswers[word.id]}
                  position={droppedAnswers[word.id] ? null : { x: 0, y: 0 }}
                >
                  <AnswerBox color={word.color}>{word.word}</AnswerBox>
                </Draggable>
              ))}
            </div>
          </div>
          {submitted && (
            <div style={{ marginTop: "20px", marginRight: "50px" }}>
              {isCorrect ? (
                <p style={{ color: "green" }}>
                  Chính xác! Bạn đã trả lời đúng.
                </p>
              ) : (
                <p style={{ color: "red" }}>Sai rồi! Vui lòng thử lại.</p>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            width: "300px",
            right: "0px",
            bottom: "0px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: "20px",
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          {/* Lớp overlay màu xanh nhạt */}
          <Overlay />

          {/* Hình nền */}
          <BackgroundImage />

          {/* Hướng dẫn */}
          <InstructionsContainer>
            <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "23px" }}
              >
                Instructions
              </Typography>
            </Box>

            {/* Step 1 */}
            <Box
              sx={{
                ml: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "15px",
                  mr: 1,
                }}
              >
                Step 1:
                <span style={{ fontWeight: "200" }}>
                  {" "}
                  Fill in input box number 1.
                </span>
              </Typography>
            </Box>

            {/* Step 2 */}
            <Box
              sx={{
                ml: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "15px",
                  mr: 1,
                }}
              >
                Step 2:{" "}
                <span style={{ fontWeight: "200" }}>
                  {" "}
                  Drag the answer, and drop it into input box number 2.
                </span>
              </Typography>
            </Box>

            {/* Step 3 */}
            <Box
              sx={{
                ml: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "15px",
                  mr: 1,
                }}
              >
                Step 3:{" "}
                <span style={{ fontWeight: "200" }}>
                  {" "}
                  Click the submit button to check the results.
                </span>
              </Typography>
            </Box>
          </InstructionsContainer>

          {/* Nút Submit */}
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",
              fontSize: "22px",
              textAlign: "left",
              mr: 3,
            }}
          >
            Submit
          </SubmitButton>
        </div>
      </Container>
    </ThemeProvider>
  );
}
