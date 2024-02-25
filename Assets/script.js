

var currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm a')
var displayDate = document.querySelector('currentDate')
var currentTime = dayjs().hour();

console.log(currentTime)
$('#currentDate').html(currentDate)

