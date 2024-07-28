import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteTask, update } from "../../store/calendarSlice";

type Props = {
  onEdit: (id: string) => any;
};

function useCallbacks({ onEdit }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return {
    onDelete: useCallback((id: string) => {
      dispatch(deleteTask(id));
    }, []),
    onEdit: (id: string) => {
      onEdit(id);
    },
    onCheck: useCallback((id: string, status: boolean) => {
      dispatch(update({ id, status }));
    }, []),
  };
}

export default useCallbacks;
