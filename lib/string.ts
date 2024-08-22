export const replaceFaNum2EnNum = (number: string): string => {
  return (
    number
      //@ts-ignore
      .replaceAll(/۰/g, "0")
      .replaceAll(/۱/g, "1")
      .replaceAll(/۲/g, "2")
      .replaceAll(/۳/g, "3")
      .replaceAll(/۴/g, "4")
      .replaceAll(/۵/g, "5")
      .replaceAll(/۶/g, "6")
      .replaceAll(/۷/g, "7")
      .replaceAll(/۸/g, "8")
      .replaceAll(/۹/g, "9")
  );
};

export const categoryName = (value: string): string => {
  switch (value) {
    case "Shopping":
      return "خرید";
    case "Food":
      return "غذا";
    case "Transport":
      return "سفر";
    case "Entertainment":
      return "سرگرمی";
    case "Health":
      return "سلامتی";
    case "Education":
      return "تحصیل";
    case "Other":
      return "سایر";
    default:
      return "دسته بندی را وارد کنید";
  }
};

type TGetDate = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
};

export const getDate = (date: TGetDate): string =>  {

    if( date.day === 0 || date.month === 0 || date.year === 0 ){

        return "تاریخ خود را انتخاب کنید"
    }
    return `${date.year}/${date.month}/${date.day}`
}