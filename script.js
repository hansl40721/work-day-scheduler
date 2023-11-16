// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveButton = $(".saveBtn");
var currentDay = $("#currentDay");
var timeBlocks = $(".time-block");

$(function () {

  var currentHour = dayjs().hour();
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveButton.on("click", function (event) {
    var eventId = $(this).parent("div").attr("id");
    var timeBlockText = $(this).parent("div").children("textarea").val();

    localStorage.setItem(eventId, timeBlockText);
  })
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $.each(timeBlocks, function (index) {
    if (timeBlocks[index].id > currentHour) {
      timeBlocks.eq(index).addClass("future");
    } else if(timeBlocks[index].id < currentHour) {
      timeBlocks.eq(index).addClass("past");
    } else {
      timeBlocks.eq(index).addClass("present");
    }
  })

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $.each(timeBlocks, function(index) {
    var keyToFind = index + 9;
    var valToFind = localStorage.getItem(keyToFind);
    console.log(valToFind);
    $(this).children('textarea').val(valToFind);
  })
  //
  // TODO: Add code to display the current date in the header of the page.
  currentDay.text(dayjs().format("dddd, MMMM DD"));
});
