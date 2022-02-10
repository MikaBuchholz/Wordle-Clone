import BackspaceIcon from "@mui/icons-material/Backspace";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import "../styles/Keyboard.css";

interface KeyboardProps {
  setLetter: (letter: string) => void;
  submit: (e: any) => void;
  deleteLetter: () => void;
  keyboardColors: { letter: string; color: string }[];
}

export default function Keyboard(props: KeyboardProps): JSX.Element {
  const upperRow: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const lowerRow: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

  const { setLetter, submit, deleteLetter, keyboardColors } = props;

  const getLetter = (letter: string) => {
    let keyData = Object.entries(keyboardColors);

    for (let i = keyData.length - 1; i >= 0; i--) {
      if (keyData[i][1].letter === letter) {
        return keyData[i][1].color;
      }
    }

    return "Grey";
  };

  return (
    <>
      <div className="Keyboard-Wrapper">
        <div className="Center-Wrapper">
          <div className="Upper-Row">
            {upperRow.map((letter: string) => {
              return (
                <button
                  className={`Button ${getLetter(letter)}`}
                  key={letter}
                  onClick={() => {
                    setLetter(letter);
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="Center-Wrapper">
          <div className="Middle-Row">
            {middleRow.map((letter: string) => {
              return (
                <button
                  className={`Button ${getLetter(letter)}`}
                  key={letter}
                  onClick={() => {
                    setLetter(letter);
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="Center-Wrapper">
          <div className="Lower-Row">
            <button onClick={submit} className="Button Special-R">
              <SubdirectoryArrowRightIcon
                style={{
                  color: "white",
                  fontSize: "1.5vw",
                  marginTop: "0.1em",
                }}
              />
            </button>
            {lowerRow.map((letter: string) => {
              return (
                <button
                  className={`Button ${getLetter(letter)}`}
                  key={letter}
                  onClick={() => {
                    setLetter(letter);
                  }}
                >
                  {letter}
                </button>
              );
            })}

            <button onClick={deleteLetter} className="Button Special-R">
              <BackspaceIcon
                style={{
                  color: "white",
                  fontSize: "1.5vw",
                  marginTop: "0.1em",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
