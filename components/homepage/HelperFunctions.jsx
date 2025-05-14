// libraries can't give correct hijri date and we will probably need API

import {addDays, differenceInMinutes, isAfter, isBefore } from "date-fns";
import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import moment from "moment-hijri";
import {Text} from "react-native"

export const GetCurrentPrayerAndTimeLeft = () => {

  let now = new Date();
  const coordinates = new Coordinates(24.8607, 67.0011); //karachi hardocded
  const params = CalculationMethod.MuslimWorldLeague();
  let prayerTimes = new PrayerTimes(coordinates, now, params);

  let times = {
    Fajr: prayerTimes.fajr,
    Sunrise: prayerTimes.sunrise,
    Zuhr: prayerTimes.dhuhr,
    Asr: prayerTimes.asr,
    Maghrib: prayerTimes.maghrib,
    Isha: prayerTimes.isha,
  };

  if (isBefore(now, times.Fajr)) {
    const previousDate = new Date(now);
    previousDate.setDate(previousDate.getDate() - 1); 
    prayerTimes = new PrayerTimes(coordinates, previousDate, params);

    times = {
      Fajr: prayerTimes.fajr,
      Sunrise: prayerTimes.sunrise,
      Zuhr: prayerTimes.dhuhr,
      Asr: prayerTimes.asr,
      Maghrib: prayerTimes.maghrib,
      Isha: prayerTimes.isha, 
    };
  }

  const prayerOrder = ["Fajr", "Sunrise", "Zuhr", "Asr", "Maghrib", "Isha", "Fajr"];
  
  let currentPrayer = "";
  let nextPrayer = "";
  let timeLeftMinutes = 0;

  for (let i = 0; i < prayerOrder.length - 1; i++) {
    const current = prayerOrder[i];
    const next = prayerOrder[i + 1];

    if (now >= times[current] && now < times[next]) {
      currentPrayer = current;
      nextPrayer = next;
      timeLeftMinutes = differenceInMinutes(times[next], now);
      break;
    }
  }

  if (isAfter(now, times.Isha)) {
    currentPrayer = "Isha";
    nextPrayer = "Fajr";
    timeLeftMinutes = differenceInMinutes(addDays(times.Fajr, 1), now);
  }

  const roundToNearestHalf = (num) => Math.round(num * 2) / 2;
  let timeLeftHours = roundToNearestHalf(timeLeftMinutes / 60);
  let timeLeftStr = timeLeftHours >= 1 ? `${timeLeftHours} Hours` : `${timeLeftMinutes} Minutes`;

  return (
    <Text className="text-white text-sm font-osregular">
      {nextPrayer} in {timeLeftStr}
    </Text>
  );
};


moment.locale("en")

export const GetHijriDate = () => {
  const hijriDate = moment().format("iD");

  const firstCapital = (month) => {
    if (!month) return "";
    return month.charAt(0).toUpperCase() + month.slice(1);
  }

  const hijriMonth = firstCapital(moment().format("iMMMM"));
  const hijriYear = moment().format("iYYYY"); 

  // to get the st, nd, rd, or th after date
  const getOrdinal = (num) => {
    if (num === "1") return "1st";
    if (num === "2") return "2nd";
    if (num === "3") return "3rd";
    return `${num}th`;
  };

  return (
    <Text className="text-white text-sm font-osregular">
        {getOrdinal(hijriDate)} {hijriMonth}, {hijriYear} AH
    </Text>
  );
}
