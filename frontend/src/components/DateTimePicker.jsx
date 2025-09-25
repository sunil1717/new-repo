import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "../utils/axiosInstance";
import { useShopStore } from "../store/shopStore";

// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const ADELAIDE_TZ = "Australia/Adelaide";

export default function DateTimePicker() {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useShopStore();
  const today = dayjs().tz(ADELAIDE_TZ).startOf("day");

  const [weekStart, setWeekStart] = useState(today);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    { label: "morning", title: "Morning", time: "8am - 11am" },
    { label: "lunch", title: "Lunch", time: "11am - 2pm" },
    { label: "afternoon", title: "Afternoon", time: "2pm - 5pm" },
  ];

  const getWeekDates = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = weekStart.add(i, "day");
      return {
        day: date.format("ddd"),
        dateNum: date.date(),
        month: date.format("MMM"),
        full: date.tz(ADELAIDE_TZ).format("YYYY-MM-DD"),
      };
    });
  };

  const fetchAvailability = async (date) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/slots/check", { date });
      setAvailability(res.data.availability);
    } catch (err) {
      console.error("Error fetching availability", err);
      setAvailability(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Select a fitting date:</h2>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setWeekStart(weekStart.subtract(7, "day"))}
          className={`text-sm font-medium ${weekStart.isSame(today, "week") ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={weekStart.isSame(today, "week")}
        >
          &lt; Prev week
        </button>
        <button
          onClick={() => setWeekStart(weekStart.add(7, "day"))}
          className="text-sm font-medium"
        >
          Next week &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {getWeekDates().map((d) => {
          const date = dayjs.tz(d.full, "YYYY-MM-DD", ADELAIDE_TZ);
          const isToday = date.isSame(today, "day");
          const isPast = date.isBefore(today, "day");

          const todayDay = today.day();
          const now = dayjs().tz(ADELAIDE_TZ);

          let shouldDisable = false;

          // === Friday Logic ===
          if (todayDay === 5) {
            if (now.hour() < 8) {
              // Before 8AM → only Saturday disabled
              shouldDisable = date.isSame(today.add(1, "day"), "day");
            } else {
              // After 8AM → Saturday & Sunday disabled
              shouldDisable =
                date.isSame(today.add(1, "day"), "day") ||
                date.isSame(today.add(2, "day"), "day");
            }
          }

          // === Saturday Logic ===
          if (todayDay === 6) {
            shouldDisable =
              date.isSame(today, "day") || // block Saturday itself
              date.isSame(today.add(1, "day"), "day"); // block Sunday
          }

          // === Sunday Logic ===
          if (todayDay === 0) {
            shouldDisable = date.isSame(today, "day"); // block Sunday itself
          }

          if (isPast && !isToday) return null;

          return (
            <button
              key={d.full}
              onClick={() => {
                setSelectedDate(d.full);
                setSelectedTime(null);
              }}
              disabled={shouldDisable}
              className={`p-2 rounded-md border text-center ${selectedDate === d.full
                ? "bg-red-400 border-red-500"
                : shouldDisable
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-300"
                }`}
            >
              <div className="text-sm font-semibold">{d.day}</div>
              <div className="text-lg">{d.dateNum}</div>
              <div className="text-xs">{d.month}</div>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Preferred service time:</h3>

          {loading ? (
            <p>Loading availability...</p>
          ) : availability ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const now = dayjs().tz(ADELAIDE_TZ);
                  const selected =dayjs.tz(selectedDate, "YYYY-MM-DD", ADELAIDE_TZ);
                  const isTodaySelected = selected.isSame(now, "day");

                  // let isClosedByTime = false;

                  // if (isTodaySelected) {
                  //   if (slot.label === "morning") {
                  //     // Always disable today's morning slot
                  //     isClosedByTime = true;
                  //   } else if (slot.label === "lunch" && now.hour() >= 8) {
                  //     isClosedByTime = true;
                  //   } else if (slot.label === "afternoon" && now.hour() >= 11) {
                  //     isClosedByTime = true;
                  //   }
                  // }

                  // // === Tomorrow morning logic ===
                  // if (
                  //   slot.label === "morning" &&
                  //   selected.isSame(now.add(1, "day"), "day") &&
                  //   now.hour() >= 21
                  // ) {
                  //   isClosedByTime = true;
                  // }

                  const isDisabled = availability[slot.label] <= 0 ;

                  return (
                    <button
                      key={slot.label}
                      onClick={() => setSelectedTime(slot.label)}
                      disabled={isDisabled}
                      className={`p-3 rounded-md border text-center ${selectedTime === slot.label
                        ? "bg-red-400 border-red-500"
                        : !isDisabled
                          ? "bg-white border-gray-300"
                          : "bg-gray-200 border-gray-300 cursor-not-allowed"
                        }`}
                    >
                      <div className="font-semibold">{slot.title}</div>
                      <div className="text-sm">{slot.time}</div>
                      {availability[slot.label] === 1 &&  (
                        <div className="text-xs mt-1 text-red-500 font-bold">
                          1 slot left
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Flexible Option */}
              {(() => {
                const now = dayjs().tz(ADELAIDE_TZ);
                const selected = dayjs(selectedDate).tz(ADELAIDE_TZ);
                const isTodaySelected = selected.isSame(now, "day");
                // const isFlexibleClosed = isTodaySelected && now.hour() >= 17;
                const isFlexibleDisabled = availability.flexible <= 0 ;

                return (
                  <button
                    onClick={() => setSelectedTime("flexible")}
                    disabled={isFlexibleDisabled}
                    className={`mt-4 w-full p-3 rounded-md font-semibold ${selectedTime === "flexible"
                      ? "bg-red-400 border-red-500"
                      : !isFlexibleDisabled
                        ? "bg-gray-200"
                        : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    I'm flexible{" "}
                    <span className="font-normal text-sm">
                      {" "}
                      <span className="bg-green-500 rounded-4xl">-$10 *</span>
                    </span>
                    {availability.flexible === 1 && (
                      <div className="text-xs mt-1 text-red-500 font-bold">
                        1 slot left
                      </div>
                    )}
                  </button>
                );
              })()}
            </>
          ) : (
            <p>No availability data.</p>
          )}
        </>
      )}
    </div>
  );
}