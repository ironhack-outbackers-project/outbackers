// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("outbackers JS imported successfully!");
});

// date range picker
$(function() {
  $('input[name="date"]').daterangepicker({
    dateFormat: 'dd/mm/yy' ,

    opens: 'center'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});