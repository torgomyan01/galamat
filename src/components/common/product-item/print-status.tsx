import { ProjectDataPositions } from "@/utils/consts";

interface IThisProps {
  position: (typeof ProjectDataPositions)[number]["value"];
}

function PrintStatus({ position }: IThisProps) {
  const findColor = ProjectDataPositions.find(
    (_pos) => _pos.value === position,
  );

  return (
    <span className="style" style={{ backgroundColor: findColor?.color }}>
      Бизнес+
    </span>
  );
}

export default PrintStatus;
