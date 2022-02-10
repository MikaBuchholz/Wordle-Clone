import { LinearProgress } from "@mui/material";
import "../styles/GameScreen.css";

export default function GameScreen(): JSX.Element {
  return (
    <>
      <div className="Game-Screen-Wrapper">
        <div className="Game-Screen">
          <LinearProgress variant="determinate" value={30} />
        </div>
      </div>
    </>
  );
}
