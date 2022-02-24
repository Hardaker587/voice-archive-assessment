import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { tabs } from "./tabSlice";

export function Tab() {
  const dispatch = useAppDispatch();
  const currentTabs = useAppSelector(tabs);

  return <div>{tabs.length}</div>;
}
