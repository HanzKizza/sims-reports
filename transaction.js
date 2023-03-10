
$(document).ready(function () {
    getTransactions()
});

function getTransactions(){
    // alert("Fetching data")
    $.ajax({
        url: "https://sims-api.surepayltd.com/feespayment",
        method: "GET",
        headers: {
            "Authorization": "111f942a-0c00-4bb8-ac95-f514e2229066"
        },
        success: function(response) {
            
            transactions = filterData(response)
            $(".totalTransactions").text(transactions.length)

            // console.log(transactions)
            transactions.forEach(transaction => {
                // +"<td>"+transactions["id"]+"</td>"
                transactionRow = "<tr>"
                                +"<td>"+transaction["particulars"]+"</td>"
                                +"<td>"+transaction["amountBilled"]+"</td>"
                                +"<td>"+transaction["amountPaid"]+"</td>"
                                +"<td>"+transaction["schoolRef"]+"</td>"
                                +"<td>"+transaction["studentNo"]+"</td>"
                                +"<td>"+transaction["trxDate"]+"</td>"
                                +"<td>"+transaction["isSynched"]+"</td>"
                            +"</tr>";
                $("#transactions").append(transactionRow);
            });
            $(".loaderAnim").hide()
        },
        error: function(xhr, status, error) {
            alert(status)
        }
    });
}






function filterData(data){
    transactions = new Array();
    $.each(data, function(key, value) {
        transactionsInfo = new Array()
            $.each(value, function(index, item) {
                index = String(index)
                transactionsInfo[""+index] = ""+item
            })
            transactions.push(transactionsInfo)
        });
        return transactions;
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
