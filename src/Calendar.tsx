import { useEffect, useState } from "react";
import { ItemType, ListType } from "./types";

export default function Calendar({ option }: any) {
  const date = new Date();
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth() + 1;
  const todayDay = date.getDate();

  const [year, setYear] = useState<number>(todayYear);
  const [month, setMonth] = useState<number>(todayMonth);

  const [dayList, setDayList] = useState<ItemType[]>([]);
  const [calendarList, setCalendarList] = useState<ListType>([]);

  const [fontSize, setFontSize] = useState({ title: "12px", body: "10px" });

  useEffect(() => {
    if (option) {
      setFontSize({
        title: `${option.container.width / 18}px`,
        body: `${option.container.width / 22}px`,
      });
    }
  }, [option]);

  useEffect(() => {
    const monthEnd31 = [1, 3, 5, 7, 8, 10, 12];
    const monthEnd30 = [4, 6, 9, 11];
    const monthEnd28 = [2];
    const dayOfWeek = new Date(`${todayYear}-${month}-01`).getDay();

    const getDayList = (num: number) => {
      let dayListTemp: ItemType[] = [];
      for (let i = 1; i <= num; i++) {
        dayListTemp.push(i);
      }
      for (let i = 0; i < dayOfWeek; i++) {
        dayListTemp.unshift(null);
      }
      setDayList(dayListTemp);
    };
    if (monthEnd31.includes(month)) {
      getDayList(31);
    } else if (monthEnd30.includes(month)) {
      getDayList(30);
    } else if (monthEnd28.includes(month)) {
      getDayList(28);
    }
  }, [month]);

  useEffect(() => {
    type DayItemType = (number | null)[];
    let dayListTemp: ListType = [];
    let dayItemTemp: DayItemType = [];
    if (dayList) {
      for (let i = 0; i < Math.ceil(dayList.length / 7); i++) {
        dayItemTemp = dayList.slice(7 * i, 7 * (i + 1));
        if (dayItemTemp.length === 7) {
          dayListTemp.push(dayItemTemp);
        } else {
          for (let j = dayItemTemp.length - 1; j < 6; j++) {
            dayItemTemp.push(null);
          }
          dayListTemp.push(dayItemTemp);
        }
      }
      setCalendarList(dayListTemp);
    }
  }, [dayList]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "minus") {
      if (month === 1) {
        setYear(year - 1);
        setMonth(12);
      } else {
        setMonth(month - 1);
      }
    } else if (target.id === "plus") {
      if (month === 12) {
        setYear(year + 1);
        setMonth(1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const resposiveScreen = {
    width: screenWidth <= 700 ? "200px" : `${option.container.width}px`,
    height: screenWidth <= 700 ? "200px" : `${option.container.width}px`,
    backgroundColor: option.container.backgroundColor,
    padding: `${option.container.width / 25}px`,
    borderRadius: option.container.borderRadius || "0px",
  };

  return (
    <div className="container">
      <div className="content" style={resposiveScreen}>
        <div
          className="calendarContainer"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            onClick={handleClick}
            className="title"
            style={{ width: "100%" }}
          >
            <span
              id="minus"
              className="iconVisible"
              style={{
                paddingLeft: "25px",
                fontSize: fontSize.title,
              }}
            >
              〈
            </span>
            <span style={{ fontSize: fontSize.title }}>
              {year}년 {month}월{" "}
              <span style={{ fontSize: fontSize.body, cursor: "pointer" }}>
                ▾
              </span>
            </span>
            <span
              id="plus"
              className="iconVisible"
              style={{
                paddingRight: "25px",
                fontSize: fontSize.title,
              }}
            >
              〉
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="dayOfWeek" style={{ fontSize: fontSize.body }}>
              <div
                className="dayOfWeekItemSun"
                style={{ color: option.container.sunColor }}
              >
                일
              </div>
              <div
                className="dayOfWeekItem"
                style={{ color: option.container.weekdayColor }}
              >
                월
              </div>
              <div
                className="dayOfWeekItem"
                style={{ color: option.container.weekdayColor }}
              >
                화
              </div>
              <div
                className="dayOfWeekItem"
                style={{ color: option.container.weekdayColor }}
              >
                수
              </div>
              <div
                className="dayOfWeekItem"
                style={{ color: option.container.weekdayColor }}
              >
                목
              </div>
              <div
                className="dayOfWeekItem"
                style={{ color: option.container.weekdayColor }}
              >
                금
              </div>
              <div
                className="dayOfWeekItemSat"
                style={{ color: option.container.satColor }}
              >
                토
              </div>
            </div>
            {calendarList.map((items: ItemType[], index: number) => (
              <div
                key={index}
                className="dates"
                style={{
                  width: "100%",
                  fontSize: fontSize.body,
                }}
              >
                {items.map((item: ItemType, index: number) => (
                  <div key={index} className={item ? "date" : "dateInvisible"}>
                    {index !== 0 && index !== 6 && (
                      <div
                        className={
                          todayYear === year &&
                          todayMonth === month &&
                          item === todayDay
                            ? "ifToday"
                            : ""
                        }
                        style={{ color: option.container.weekdayColor }}
                      >
                        {item}
                      </div>
                    )}
                    {index === 0 && (
                      <div
                        className={
                          todayYear === year &&
                          todayMonth === month &&
                          item === todayDay
                            ? "ifTodayisSun"
                            : ""
                        }
                        style={{ color: option.container.sunColor }}
                      >
                        {item}
                      </div>
                    )}
                    {index === 6 && (
                      <div
                        className={
                          todayYear === year &&
                          todayMonth === month &&
                          item === todayDay
                            ? "ifTodayisSat"
                            : ""
                        }
                        style={{ color: option.container.satColor }}
                      >
                        {item}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
