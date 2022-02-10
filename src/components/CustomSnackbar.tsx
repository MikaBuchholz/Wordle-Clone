import { Alert, Snackbar } from "@mui/material";

interface CustomSnackbarProps {
  gameInfo: {
    tries: number;
    gameOver: boolean;
    showSnack: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  };
  setGameInfo: (gameInfo: CustomSnackbarProps["gameInfo"]) => void;
}

export default function CustomSnackbar(props: CustomSnackbarProps) {
  const { gameInfo, setGameInfo } = props;

  let color: string = "white";
  let backgroundColor: undefined | string;


  if (gameInfo.severity === "info") {
    backgroundColor = "rgb(2, 136, 209)";
  }

  if (gameInfo.severity === "warning") {
    backgroundColor = "rgb(245, 124, 0)";
  }

  if (gameInfo.severity === "success") {
    backgroundColor = "rgb(56, 142, 60)";
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={gameInfo.showSnack}
      onClose={() => {
        setGameInfo({ ...gameInfo, showSnack: false });
      }}
      autoHideDuration={3000}
      style={{ color }}
    >
      <Alert
        onClose={() => {
          setGameInfo({ ...gameInfo, showSnack: false });
        }}
        severity={gameInfo.severity}
        style={{ backgroundColor, color }}
      >
        {gameInfo.message}
      </Alert>
    </Snackbar>
  );
}
