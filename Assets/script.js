
var apiKey = "98d710491c449ad5a6ba81a14f1ff914"
let city;


var currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm a')
var displayDate = document.querySelector('currentDate')
var currentTime = dayjs().hour();

console.log(currentTime)
$('#currentDate').html(currentDate)

