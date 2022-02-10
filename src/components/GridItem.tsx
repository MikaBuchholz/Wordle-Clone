import "../styles/GridItem.css";

interface GridItemProps {
  data: { bColor: string; letter: string };
}

export default function GridItem(props: GridItemProps): JSX.Element {
  const { data } = props;
  return (
    <>
      {data ? (
        <div className={`Item-Wrapper ${data.bColor}`}>{data.letter}</div>
      ) : null}
    </>
  );
}
