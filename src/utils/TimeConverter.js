function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  return hrs + 'h ' + mins + 'mins';
}

export function findDuration(from,to)
{
    let fromDate = new Date(from);
    let toDate = new Date(to);
    return msToTime(toDate - fromDate);
}

export function findTime(timeStamp)
{
  let time = new Date(timeStamp).toLocaleTimeString();
  return time.slice(0,5);
}