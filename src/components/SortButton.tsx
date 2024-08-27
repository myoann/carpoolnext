import { Direction, SortType } from "@/types";

import "./SortButton.css";

type Props = {
  direction: Direction;
  isActive: boolean;
  onClick: (filterType: SortType) => void;
  type: SortType;
};

const displayedFilterName = (type: SortType) => {
  switch (type) {
    case SortType.Departure:
      return "Departure";
    case SortType.Price:
      return "Price";
    case SortType.Fastest:
      return "Fastest";
  }
};

const SortButton = ({ direction, isActive, onClick, type }: Props) => (
  <button
    onClick={() => onClick(type)}
    className={`sortButton ${isActive && "sortButtonSelected"}`}
  >
    {displayedFilterName(type)}{" "}
    {isActive ? (direction === Direction.Asc ? "↑" : "↓") : ""}
  </button>
);

export default SortButton;
