var app = new Vue({
  el: '#app',
  data: {
    addedLength: '',
    addedTime: '',
    addedNotes: '',
    runs: [],
    foo: 'bar',
  },
  created: function() {
    this.getRuns();
  },
  filters: {
    dateFormat: function(run) {
      let month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      let date = new Date(run.run_on);
      console.log(date);
      let monthName = month[date.getMonth()];
      return `${date.getDate()} ${monthName} ${date.getFullYear()}`
    },
  },
  methods: {
    getRuns: function() {
      console.log("Entered the getRuns function");
      console.log(this.runs);
      axios.get('http://104.236.13.247:3001/api/runs').then(response => {
        this.runs = response.data;
        return true;
      }).catch(err => {
      });
    },
    addRun: function() {
      console.log("hi there");
      axios.post('http://104.236.13.247:3001/api/runs', {
        length: this.addedLength,
        time: this.addedTime,
        personal_notes: this.addedNotes,
      }).then(response => {
        this.addedLength = '';
        this.addedTime = '';
        this.addedNotes = '';
        this.getRuns();
        return true;
      }).catch(err => {
      });
    },
    deleteRun: function(run) {
      axios.delete('http://104.236.13.247:3001/api/runs/' + run.id).then(response => {
        this.getRuns();
        return true;
      }).catch(err => {
      });
    },
  },
});
