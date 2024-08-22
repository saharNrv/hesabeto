import * as jalaali from "jalaali-js";

// this function get date and convert it to timestamp
export function date2Timestamp(date: Date): number {
  const specificDate:Date = new Date(date) 
  const timeStamp:number = specificDate.getTime()
  return timeStamp
}


export const getPersianMonth = (type: string): number => {
  const today = new Date();
  const jalaaliDate = jalaali.toJalaali(today);

  switch(type) {
    case "d":
      return jalaaliDate.jd;
    case "m":
      return jalaaliDate.jm;
    case "y":
      return jalaaliDate.jy;
    default:
      return 0    
  }
};

export const getMonthlyName = (month: number): string => {
  switch (month) {
    case 1:
      return "فروردین";
    case 2:
      return "اردیبهشت";
    case 3:
      return "خرداد";
    case 4:
      return "تیر";
    case 5:
      return "مرداد";
    case 6:
      return "شهریور";
    case 7:
      return "مهر";
    case 8:
      return "آبان";
    case 9:
      return "آذر";
    case 10:
      return "دی";
    case 11:
      return "بهمن";
    case 12:
      return "اسفند";
    default:
      return "ماه را انتخاب کنید";
  }
};
