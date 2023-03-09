
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
                schoolRow = "<tr>"
                                +"<td>"+school["schoolId"]+"</td>"
                                +"<td>"+school["name"]+"</td>"
                                +"<td>"+school["schoolType"]+"</td>"
                                +"<td>"+school["officeContact"]+"</td>"
                                +"<td>"+school["bankSet"]+"</td>"
                                +"<td>"+school["email"]+"</td>"
                                +"<td>"+school["town"]+"</td>"
                            +"</tr>";
                $("#schools").append(schoolRow);
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




function searchTable(){
    var searchText = $("#mySearch").val().toLowerCase()
    // alert(searchText)
    // if(searchText == ""){
    //     return false
    // }

    $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1)
    });

    var numVisibleRows = $("tbody tr:visible").length;
    $(".searchResultsNumber").text(numVisibleRows)

}
