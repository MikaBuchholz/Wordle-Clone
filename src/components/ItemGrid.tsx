import GridItem from "./GridItem";
import "../styles/ItemGrid.css";

interface ItemGridProps {
  data: {
    bColor: string;
    letter: string;
  }[];
}

export default function ItemGrid(props: ItemGridProps): JSX.Element {
  const { data } = props;
  return (
    <div className="Item-Grid">
      {data.map((item: { bColor: string; letter: string }, index: number) => {
        return <GridItem key={index} data={item} />;
      })}
    </div>
  );
}
