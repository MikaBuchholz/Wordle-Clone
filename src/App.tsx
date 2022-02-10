import { useEffect, useState } from "react";
import ItemGrid from "./components/ItemGrid";
import { words } from "./words/words";
import Keyboard from "./components/Keyboard";
import CustomSnackbar from "./components/CustomSnackbar";
import { Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "./styles/App.css";

function App() {
  const [data, setData] = useState<
    {
      bColor: string;
      letter: string;
    }[]
  >();
  const [word, setWord] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  const [keyboardColors, setKeyboardColors] = useState<
    { letter: string; color: string }[]
  >([{ letter: "DEFAULT", color: "" }]);

  const [secrectWord, setSecrectWord] = useState(
    words[Math.floor(Math.random() * words.length)].toUpperCase()
  );

  const [triggerUnique, setTriggerUnique] = useState(false);
  const [gameInfo, setGameInfo] = useState<{
    tries: number;
    gameOver: boolean;
    showSnack: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({
    tries: 0,
    gameOver: false,
    showSnack: false,
    message: "",
    severity: "info",
  });

  const initData = () => {
    let data: {
      bColor: string;
      letter: string;
    }[] = [];

    for (let i = 0; i < 30; i++) {
      data.push({
        bColor: "#121213",
        letter: "",
      });
    }

    setData(data);
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameInfo.tries === 6) {
      setGameInfo({
        ...gameInfo,
        gameOver: true,
        showSnack: true,
        message: secrectWord,
        severity: "info",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInfo.tries]);

  const resetGame = () => {
    setGameInfo({
      ...gameInfo,
      tries: 0,
      gameOver: false,
      showSnack: false,
      message: "",
      severity: "info",
    });
    setSecrectWord(
      words[Math.floor(Math.random() * words.length)].toUpperCase()
    );
    setKeyboardColors([{ letter: "DEFAULT", color: "" }]);
    setWord("");
    setCurrentIndex(0);
    setLetterIndex(0);
    initData();
  };

  const getLetterPos = (): number[] => {
    let letterPos: number[] = [];
    // 2 == Pos Correct and In word
    // 1 = In word but pos not correct
    // 0 = Not in word

    if (word.length === secrectWord.length) {
      setWord(word.toLowerCase());

      for (let i = 0; i < secrectWord.length; i++) {
        if (secrectWord.includes(word[i]) && word[i] === secrectWord[i]) {
          letterPos.push(2);
        }
        if (secrectWord.includes(word[i]) && word[i] !== secrectWord[i]) {
          letterPos.push(1);
        }
        if (!secrectWord.includes(word[i])) {
          letterPos.push(0);
        }
      }
    }

    for (let i = 0; i < secrectWord.length; i++) {
      if (word.split(word[i]).length - 1 > 1 && word[i] !== secrectWord[i]) {
        letterPos[i] = 0;
      }
    }

    const sum = letterPos.reduce((partialSum, a) => partialSum + a, 0);

    if (sum === 10 && gameInfo.tries < 6) {
      setGameInfo({
        ...gameInfo,
        gameOver: true,
        showSnack: true,
        message: "You won!",
        severity: "success",
      });
    }

    return letterPos;
  };

  const setLetter = (letter: string) => {
    if (letterIndex <= 29 && !gameInfo.gameOver) {
      if (word.length <= secrectWord.length - 1) {
        // eslint-disable-next-line array-callback-return
        data?.map((item: any, index: number) => {
          if (index === letterIndex) {
            item.letter = letter;
            setWord(word + letter);
          }
        });

        setLetterIndex(letterIndex + 1);
      }
    }
  };

  const deleteLetter = () => {
    if (letterIndex > currentIndex) {
      // eslint-disable-next-line array-callback-return
      data?.map((item: any, index: number) => {
        if (index === letterIndex - 1) {
          item.letter = "";
        }
      });

      setWord(word.slice(0, word.length - 1));
      setLetterIndex(letterIndex - 1);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    setGameInfo({ ...gameInfo, tries: gameInfo.tries + 1 });

    if (words.includes(word.toLowerCase()) && !gameInfo.gameOver) {
      if (word.length === secrectWord.length) {
        if (currentIndex <= 30) {
          let letterPos: number[] = getLetterPos();

          setTriggerUnique(!triggerUnique);

          for (let i = currentIndex; i < currentIndex + 5; i++) {
            // eslint-disable-next-line array-callback-return
            data?.map((item: any, index: number) => {
              if (i === index) {
                let letter: string = item.letter;

                if (letterPos[i - currentIndex] === 0) {
                  item.bColor = "BG-Black";

                  setKeyboardColors((prevState: any) => {
                    return {
                      ...prevState,
                      [i]: { letter, color: "Black" },
                    };
                  });
                }

                if (letterPos[i - currentIndex] === 1) {
                  item.bColor = "BG-Yellow";

                  setKeyboardColors((prevState: any) => {
                    return {
                      ...prevState,
                      [i]: { letter, color: "Yellow" },
                    };
                  });
                }

                if (letterPos[i - currentIndex] === 2) {
                  item.bColor = "BG-Green";

                  setKeyboardColors((prevState: any) => {
                    return {
                      ...prevState,
                      [i]: { letter, color: "Green" },
                    };
                  });
                }
              }
            });
          }
          setCurrentIndex(currentIndex + 5);
          setWord("");
        }
      }
    } else {
      setGameInfo({
        ...gameInfo,
        gameOver: false,
        showSnack: true,
        message: "NOT IN WORD LIST!",
        severity: "warning",
      });
    }
  };

  return (
    <>
      <CustomSnackbar gameInfo={gameInfo} setGameInfo={setGameInfo} />

      <>
        <div className="Grid-Wrapper">
          {data ? <ItemGrid data={data} /> : null}
        </div>
      </>

      <div className="keyboard-Wrapper-Wrapper">
        <Keyboard
          setLetter={setLetter}
          submit={handleSubmit}
          deleteLetter={deleteLetter}
          keyboardColors={keyboardColors}
        />
      </div>
      <div className="New-Game-Wrapper">
        {gameInfo.gameOver ? (
          <Button
            className="M-Button"
            endIcon={<AutorenewIcon />}
            onClick={resetGame}
          >
            New Game
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default App;
