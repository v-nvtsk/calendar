import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
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
  getToday,
  getTodayAsObject,
  getWeekNumber,
  sanitizeObject,
} from "../../helpers";
import { AppDispatch } from "../../store";
import { read, update } from "../../store/calendarSlice";
import { rootSelectors } from "../../store/selectors";
import "./style.css";

export function Calendar() {
  const [controlsTitle, setControlsTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [subfilter, setSubFilter] = useState<Filter>({});

  const dispatch = useDispatch<AppDispatch>();
  const calendarState = useSelector(rootSelectors.calendarState);
  const { items } = calendarState;

  const navigate = useNavigate();
  const { view } = useParams();

  const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

  const today = getTodayAsObject();
  let { year, month, date } = today;
  let week = -1;
  const viewId = searchAsObject.id;
  if (searchAsObject.year) year = Number(searchAsObject.year);
  if (searchAsObject.month) month = Number(searchAsObject.month);
  if (searchAsObject.date) date = Number(searchAsObject.date);
  if (searchAsObject.week) week = Number(searchAsObject.week);
  week = week === -1 ? getWeekNumber(new Date(year, month, date).getTime())[1] : week;

  useLayoutEffect(() => {
    if (!view) {
      navigate(`/calendar/year`, { replace: true });
      return;
    }
    if (!searchAsObject.filter) {
      dispatch(read(getFilterForView({ newView: view, year, month, date, week })));
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
  }, [view, year, month, date, week, searchAsObject.filter]);

  const callbacks = {
    activeViewhandler: useCallback(
      (newView: string) => {
        setSubFilter({});
        navigate(generatePathname({ newView, year, month, date, week, id: viewId }));
      },
      [year, month, date, week],
    ),
    goToRelative: useCallback(
      (action: string, newView: string) => {
        const pathObj: GetPathArgs = { newView, year, month, date, week };
        if (action === "next") pathObj[newView] += 1;
        else pathObj[newView] -= 1;
        navigate(generatePathname(pathObj));
      },
      [view, year, month, date, week],
    ),
    onToday: useCallback(() => {
      const pathObj: GetPathArgs = {
        newView: view || "year",
        year: today.year,
        month: today.month,
        date: today.date,
        week: getWeekNumber(getToday())[1],
      };
      navigate(generatePathname(pathObj));
    }, [view, year, month, date, week]),
    onEdit: useCallback((id: string) => {
      navigate(`../task/edit?id=${id}`);
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

  const style = {
    margin: 0,
    top: "auto",
    right: 100,
    bottom: 100,
    left: "auto",
    position: "fixed",
  };

  return (
    <main className={`page__calendar ${isLoading}`}>
      <Sidebar className="calendar__sidebar" onFilter={callbacks.onFilter} subfilter={subfilter} />
      <CalendarControls
        controlsTitle={controlsTitle}
        activeView={view!}
        views={VIEWS}
        setActiveView={callbacks.activeViewhandler}
        onGoToRelative={callbacks.goToRelative}
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
          week={week}
          items={items}
        />
      )}
      <Fab sx={style} color="primary" aria-label="add" onClick={() => alert("add")}>
        <AddIcon />
      </Fab>
    </main>
  );
}
