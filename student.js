
$(document).ready(function () {
    getStudents()
});

function getStudents(){
    // alert("Fetching data")
    $.ajax({
        url: "https://sims-api.surepayltd.com/student",
        method: "GET",
        headers: {
            "Authorization": "111f942a-0c00-4bb8-ac95-f514e2229066"
        },
        success: function(response) {
            
            students = filterData(response)
            $(".totalStudents").text(students.length)

            // console.log(student)
            students.forEach(student => {
                // +"<td>"+student["id"]+"</td>"
                studentRow = "<tr>"
                                +"<td>"+student["studentNo"]+"</td>"
                                +"<td>"+student["name"]+"</td>"
                                +"<td>"+student["schoolId"]+"</td>"
                                +"<td>"+student["classEn"]+"</td>"
                                +"<td>"+student["lastUpdateDate"]+"</td>"
                                +"<td>"+student["feesBalance"]+"</td>"
                            +"</tr>";
                $("#students").append(studentRow);
            });
            $(".loaderAnim").hide()
        },
        error: function(xhr, status, error) {
            alert(status)
        }
    });
}






function filterData(data){
    students = new Array();
    $.each(data, function(key, value) {
            studentinfo = new Array()
            $.each(value, function(index, item) {
                index = String(index)
                studentinfo[""+index] = ""+item
            })
            students.push(studentinfo)
        });
        return students;
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
