export default function timestampParse(t) {
  let date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.
  const curr = new Date(); // 현재시간
  if(curr - date < 60 * 60 * 1000) {
    return Math.floor((curr - date)/60000) +"분 전";
  }
  let year = date.getFullYear(); //년도 구하기
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  return (
    year + "년 " + month + "월 " + day + "일 " + hour + ":" + minute
  );
}
