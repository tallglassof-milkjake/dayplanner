let mySchedule = [
    {
        id: '0',
        time: '08:00',
        reminder: ' '
    },
    {
        id: '1',
        time: '09:00',
        reminder: ''
    },
    {
        id: '2',
        time: '10:00',
        reminder: ''
    },
    {
        id: '3',
        time: '11:00',
        reminder: ''
    },
    {
        id: '4',
        time: '12:00',
        reminder: ''
    },
    {
        id: '5',
        time: '13:00',
        reminder: ''
    },
    {
        id: '6',
        time: '14:00',
        reminder: ''
    },
    {
        id: '7',
        time: '15:00',
        reminder: ''
    },
    {
        id: '8',
        time: '16:00',
        reminder: ''
    },
    {
        id: '9',
        time: '17:00',
        reminder: ''
    },
]

console.log(mySchedule);

// Display time to "currentDay"
function getDate() {
    let currentDate = moment().format('dddd Do MMMM YYYY');
    $('#currentDay').text(currentDate);
    let currentTime = moment().format('HH:mm a');
    $('#currentTime').text(currentTime);
}

// Display table
mySchedule.forEach(function(myHour) {
    let hourRow = $('<table>').attr({
        'class': 'row'
    });
    $('.container').append(hourRow);

    let hourArea = $('<td>').text(myHour.time).attr({
        'class': 'col-1 hour'
    });

    let hourPlan = $('<td>').attr({
        'class': 'col-10 description'
    });

    let hourSchedule = $('<textarea>');

    hourPlan.append(hourSchedule);
    hourSchedule.attr('id', myHour.id);

    if (myHour.time < moment().format('HH')) {
        hourSchedule.attr({
            'class': 'past',
        });
    } else if (myHour.time === moment().format('HH')) {
        mySchedule.attr({
            'class': 'present'
        });
    } else if (myHour.time > moment().format('HH')) {
        hourSchedule.attr({
            'class': 'future'
        });
    }

    let saveButton = $('<i class="far fa-save"></i>');
    let saveArea = $('<td>').attr({
        'class': 'col-1 saveArea'
    });
    let saveSchedule = $('<button>').attr({
        'class': 'saveBtn btn btn-outline-primary'
    });
    saveArea.append(saveSchedule);
    saveSchedule.append(saveButton);
    hourRow.append(hourArea, hourPlan, saveArea);
});

// Function to save data
function saveDay() {
    localStorage.setItem('mySchedule', JSON.stringify(mySchedule));
};

// Function to display data
function displayDay() {
    mySchedule.forEach(function (thisHour) {
        $(`#${thisHour.id}`).val(thisHour.reminder);
    });
}

$('.saveBtn').on('click', function(event) {
    event.preventDefault();
    let saveIndex = $(this).siblings('.description').children('.future').attr('.id');
    mySchedule.reminder[saveIndex] = $(this).siblings('.description').children('.future').val();
    console.log(saveIndex);
    // Functions to save and display data here
    saveDay();
    displayDay();
});


getDate();