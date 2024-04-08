import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Filter } from "../../api/calendar.types";
import { CalendarContent } from "../../components/calendar-content";
import { CalendarControls } from "../../components/calendar-controls/calendar-controls";
import { Sidebar } from "../../components/sidebar";
import {
  GetPathArgs,
  VIEWS,
  Views,
  generatePathname,
  getFilterForView,
  getTodayAsObject,
  sanitizeObject,
} from "../../helpers";
import { AppDispatch, StoreRootState } from "../../store";
import { CalendarState, read, update } from "../../store/calendarSlice";
import "./style.css";

export function Calendar() {
  const [controlsTitle, setControlsTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [subfilter, setSubFilter] = useState<Filter>({});

  const dispatch = useDispatch<AppDispatch>();
  const calendarState = useSelector<StoreRootState>((state) => state.calendar) as CalendarState;
  const { items } = calendarState;

  const navigate = useNavigate();
  const { view } = useParams();

  const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

  const today = getTodayAsObject();
  let { year, month, date } = today;
  const viewId = searchAsObject.id;
  if (searchAsObject.year) year = Number(searchAsObject.year);
  if (searchAsObject.month) month = Number(searchAsObject.month);
  if (searchAsObject.date) date = Number(searchAsObject.date);

  useLayoutEffect(() => {
    if (!view) {
      navigate(`/calendar/year`, { replace: true });
      return;
    }
    if (!searchAsObject.filter) {
      dispatch(read(getFilterForView({ newView: view, year, month, date })));
      setSubFilter({});
    } else {
      const filter = JSON.parse(searchAsObject.filter!) as Filter;
      try {
        setSubFilter(filter);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
      dispatch(read(filter));
    }
  }, [view, year, month, date, searchAsObject.filter]);

  const callbacks = {
    activeViewhandler: useCallback(
      (newView: string) => {
        setSubFilter({});
        navigate(generatePathname({ newView, year, month, date, id: viewId }));
      },
      [year, month, date],
    ),
    onPrev: useCallback(
      (newView: string) => {
        const pathObj: GetPathArgs = { newView, year, month, date };
        pathObj[newView] -= 1;
        navigate(generatePathname(pathObj));
      },
      [view, year, month, date],
    ),
    onNext: useCallback(
      (newView: string) => {
        const pathObj: GetPathArgs = { newView, year, month, date };
        pathObj[newView] += 1;
        navigate(generatePathname(pathObj));
      },
      [view, year, month, date],
    ),
    onToday: useCallback(() => {
      navigate(`/calendar/${view}?year=${today.year}&month=${today.month}&date=${today.date}`, {});
    }, [view, year, month, date]),
    onEdit: useCallback((id: string) => {
      navigate(`../task?id=${id}`);
    }, []),
    onCheck: useCallback((id: string, status: boolean) => {
      dispatch(update({ id, status }));
    }, []),
    onFilter: useCallback(
      (newFilter: Filter) => {
        const sanitizedFilter = sanitizeObject(newFilter);
        if (Object.entries(sanitizedFilter).length === 0) {
          setSearchParams("");
          return;
        }
        setSearchParams({ filter: JSON.stringify({ ...sanitizedFilter }) });
      },
      [view],
    ),
    onSearch: useCallback(
      (value: string) => {
        setSearchParams({ filter: JSON.stringify({ text: value }) });
      },
      [view],
    ),
  };

  const isLoading = calendarState.isLoading ? "loading" : "";

  return (
    <main className={`page__calendar ${isLoading}`}>
      <Sidebar className="calendar__sidebar" onFilter={callbacks.onFilter} subfilter={subfilter} />
      <CalendarControls
        controlsTitle={controlsTitle}
        activeView={view!}
        views={VIEWS}
        setActiveView={callbacks.activeViewhandler}
        onPrev={callbacks.onPrev}
        onNext={callbacks.onNext}
        onToday={callbacks.onToday}
        onSearch={callbacks.onSearch}
      />
      {view && !isLoading && (
        <CalendarContent
          view={view as Views}
          setViewTitle={setControlsTitle}
          onEdit={callbacks.onEdit}
          onCheck={callbacks.onCheck}
          year={year}
          month={month}
          date={date}
          items={items}
        />
      )}
    </main>
  );
}
