
$(document).ready(function () {
    getSchools()
});

function getSchools(){
    // alert("Fetching data")
    $.ajax({
        url: "https://sims-api.surepayltd.com/schoolinfo",
        method: "GET",
        headers: {
            "Authorization": "111f942a-0c00-4bb8-ac95-f514e2229066"
        },
        success: function(response) {
            
            schools = filterData(response)
            $(".totalSchools").text(schools.length)

            // console.log(schools)
            schools.forEach(school => {
                // +"<td>"+school["id"]+"</td>"
                schoolRow = "<tr id="+school["id"]+">"
                                +"<td>"+school["schoolId"]+"</td>"
                                +"<td>"+school["name"]+"</td>"
                                +"<td>"+school["officeContact"]+"</td>"
                                +"<td>"+school["bankSet"]+"</td>"
                                +"<td>"+school["bankName"]+"</td>"
                                +"<td>"+school["accountNumber"]+"</td>"
                                +"<td class='transactions'><i class='fa fa-spinner fa-spin'></i></td>"
                                +"<td class='studentNumber'><i class='fa fa-spinner fa-spin'></i></td>"
                                +"<td>"+school["town"]+"</td>"
                                +"<td>"+school["agentName"]+"</td>"
                            +"</tr>";
                $("#schools").append(schoolRow);
                getStudents(school["schoolId"], school["id"])
                getTransactions(school["schoolId"], school["id"])
            });
            $(".loaderAnim").hide()
        },
        error: function(xhr, status, error) {
            alert(status)
        }
    });
}




function filterData(data){
    schools = new Array();
    $.each(data, function(key, value) {
            schoolInfo = new Array()
            $.each(value, function(index, item) {
                index = String(index)
                schoolInfo[""+index] = ""+item
            })
            schools.push(schoolInfo)
        });
        return schools;
}




function getStudents(schoolId, id){
    $.ajax({
        url: "https://sims-api.surepayltd.com/student/school/"+schoolId,
        method: "GET",
        headers: {
            "Authorization": "111f942a-0c00-4bb8-ac95-f514e2229066"
        },
        success: function(response) {
            $("#"+id+" .studentNumber").text(response.length)
        },
        error: function(xhr, status, error) {
            getStudents(schoolId, id)
            // $("#"+id+" .studentNumber").text(status)
        }
    });
}

// https://sims-api.surepayltd.com/feespayment/school/00127

function getTransactions(schoolId, id){
    $.ajax({
        url: "https://sims-api.surepayltd.com/feespayment/school/"+schoolId,
        method: "GET",
        headers: {
            "Authorization": "111f942a-0c00-4bb8-ac95-f514e2229066"
        },
        success: function(response) {
            $("#"+id+" .transactions").text(response.length)
        },
        error: function(xhr, status, error) {
            // $("#"+id+" .transactions").text(xhr.responseText)
            getTransactions(schoolId, id);
        }
    });
}



function searchTable(){
    var searchText = $("#mySearch").val().toLowerCase()

    $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
    });

    var numVisibleRows = $("tbody tr:visible").length;
    $(".searchResultsNumber").text(numVisibleRows)
}




function minSearch(el){
    minimum = parseInt($(el).val())
    if(isNaN(minimum) || (minimum == null)){
        minimum = 0
    }
    $('tbody tr').filter(function(){
        return (parseInt($(this).find('td:eq(7)').text()) < minimum);
      }).hide();

      $('tbody tr').filter(function(){
        return (parseInt($(this).find('td:eq(7)').text()) >= minimum);
      }).show();

      var numVisibleRows = $("tbody tr:visible").length;
    $(".searchResultsNumber").text(numVisibleRows)
}




function TransSearch(el){
    minimum = parseInt($(el).val())
    if(isNaN(minimum) || (minimum == null)){
        minimum = 0
    }
    $('tbody tr').filter(function(){
        return (parseInt($(this).find('td:eq(6)').text()) < minimum);
      }).hide();

      $('tbody tr').filter(function(){
        return (parseInt($(this).find('td:eq(6)').text()) >= minimum);
      }).show();

      var numVisibleRows = $("tbody tr:visible").length;
    $(".searchResultsNumber").text(numVisibleRows)
}
