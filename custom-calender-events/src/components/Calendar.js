import moment from "moment";
import React, { useEffect, useState } from "react";
import CalendarUtils from "../utils/helper";

const Calendar = () => {
  const calendarClass = new CalendarUtils();
  const event = {
    title: "doctor Booking",
    location: "",
    startTime: "2022-08-04T13:29:00.000Z",
    endTime: moment("2022-08-04T13:29:00.000Z").add("20", "minutes"),
    description: "test desc",
  };
  // console.log(event);

  const [btns, setBtns] = useState([]);

  const makeBtnArr = () => {
    let arr = [
      {
        type: "google",
      },
      {
        type: "yahoo",
      },
      {
        type: "outlookcom",
      },
      {
        type: "IOS",
      },
    ];

    let newArrWithSrc = arr.map((item) => {
      return {
        ...item,
        src: calendarClass.buildUrl(event, item.type),
        id: calendarClass.getRandomKey(),
        isFile: item.type === "IOS",
      };
    });

    // console.log(newArrWithSrc);
    setBtns(newArrWithSrc);
  };

  const handleLinkClick = (src, isFile) => {
    if (isFile) {
      const a = document.createElement("a");
      a.href = src;
      a.download = "file_name";
      // a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    let url = src || "";
    window.open(url, "_blank");
  };

  useEffect(() => {
    makeBtnArr();

    // console.log(calendarClass.buildUrl(event));
  }, []);

  return (
    <>
      {btns.length > 0 &&
        btns.map((elem) => (
          <div key={elem.id}>
            <button onClick={() => handleLinkClick(elem.src, elem.isFile)}>
              {elem.type}
            </button>
          </div>
        ))}
    </>
  );
};

export default Calendar;
