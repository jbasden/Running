var app = new Vue({
  el: '#app',
  data: {
    addedLength: '',
    addedTime: '',
    addedNotes: '',
    totalDistanceRun: 0,
    totalTimeRun: 0,
    numberRuns: 0,
    runs: [],
    statsVisible: false,
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
      let monthName = month[date.getMonth()];
      return `${date.getDate()} ${monthName} ${date.getFullYear()}`
    },
  },
  methods: {
    showStats: function() {
      this.statsVisible = true;
    },
    getRuns: function() {
        axios.get('http://104.236.13.247:3001/api/runs').then(response => {
        this.runs = response.data;
        return true;
      }).catch(err => {
      });
    },
    addRun: function() {
      this.totalDistanceRun += this.addedLength;
      this.totalTimeRun += this.addedTime;
      this.numberRuns += 1;
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
