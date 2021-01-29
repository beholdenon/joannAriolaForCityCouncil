module.exports = {
  ifeq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
  trim: function(passedString, length) {
  	return passedString.substring(0, length);
  },
  formatdate: function(passedString, withTime) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var msec = new Date(passedString);
    if(withTime) {
      var hour = msec.getHours();
      var ampm = 'AM';
      if(hour > 12) {
        hour = hour - 12;
        ampm = 'PM';
      }
      return months[msec.getMonth()] + ' ' + msec.getDay() + ', ' + msec.getFullYear() + ' - ' + hour + ':' + msec.getMinutes() + ' ' + ampm;
    }
    else {
      return months[msec.getMonth()] + ' ' + msec.getDay() + ', ' + msec.getFullYear();
    }
  }
}