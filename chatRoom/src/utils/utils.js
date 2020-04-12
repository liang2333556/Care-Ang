const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const a = [year, month, day].map(formatNumber);
    return a[0] + '.' + a[1] + '.' + a[2] + '';
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};



const formatDateTime = obj => {
  var date = new Date(obj)
  var year = date.getFullYear()
  var month = format(date.getMonth() + 1)
  var da = format(date.getDate())
  var h = format(date.getHours())
  var m = format(date.getMinutes())
  var s = format(date.getSeconds())
  return year + '-' + month + '-' + da + ' ' + h + ':' + m + ':' + s
};

const format = val => {
  return Number(val) < 10 ? '0' + val : '' + val
};


module.exports = {
    formatTime,
    formatDate,
    formatDateTime
};
