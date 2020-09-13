let myDay = [
    {
        id: "0",
        hour: "08",
        time: "08",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    
]

    // Funcion for collecting current date
    function getHeaderDate() {
        let currentDate = moment().format('dddd Do MMMM YYYY');
        $('#currentDay').text(currentDate);
    }

    // Function to save data to storage
    function saveData() {
        localStorage.setItem('myDay', JSON.stringify(myDay));
    }

    //Function to display any data in localStorage
    function displayData() {
        myDay.forEach(function (_thisHour) {
            $(`#${_thisHour.id}`).val(_thisHour.reminder);
        })
    }

    function init() {
        let storedDay = JSON.parse(localStorage.getItem("myDay"));
        if ( storedDay) {
            myDay = storedDay;
        }

        saveData();
        displayData();
    }

    // Load header date
    getHeaderDate();

    myDay.forEach(function(thisHour) {

        let hourRow = $('<form>').attr({
            "class": "row"
        });
        $(".container").append(hourRow);

        let hourField = $("<div>").text(`${thisHour.hour}${" "}${thisHour.meridiem}`).attr({
            "class": "col-md-2 hour"
        });

        let hourPlan = $("<div>").attr({
            "class": "col-md-9 description p-0"
        });
        let planData = $("<textarea>");
        hourPlan.append(planData);
        planData.attr("id", thisHour.id);
        if (thisHour.time < moment().format("HH")) {
            planData.attr ({
                "class": "past",
            })
        } else if (thisHour.time === moment().format("HH")) {
            planData.attr({
                "class": "present"
            })
        } else if (thisHour.time > moment().format("HH")) {
            planData.attr({
                "class": "future"
            })
        }

        let saveButton = $("<i class='far fa-save'></i>")
        let savePlan = $("<button>").attr({
            "class": "col-md-1 saveBtn"
        });
        savePlan.append(saveButton);
        hourRow.append(hourField, hourPlan, savePlan);
    })

    init();

    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        let saveIndex = $(this).siblings(".description").children(".future").attr(".id");
        myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
        console.log(saveIndex);
        saveData();
        displayData();
    })








