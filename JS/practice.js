if (sessionStorage.getItem("active") === null)
  location.href = "/index.html";

function logout() {
  sessionStorage.clear();
  location.href = "/index.html";
}
function get_data(subject){
    var xmlhttp = new XMLHttpRequest();
    const FDL = new FormData();
    var tabledata = null;
    FDL.append("sub", subject);
    FDL.append("email", sessionStorage.getItem("email"));
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            tabledata = JSON.parse(this.responseText);
        }
    }
    xmlhttp.open("POST", "/PHP/probs.php", false);
    xmlhttp.send(FDL);
    return tabledata;
}

function load_data(subject, btn){
    var tablediv = document.getElementById('tables');
    var tabledata = get_data(subject);
    // var tabledata = [];
    // tabledata.push({'prob_name':'Hello World', 'score':5, 'diff':1, 'status':0});
    // tabledata.push({'prob_name':'Hello There', 'score':6, 'diff':1, 'status':1});
    if(tabledata!=null)
    {
        var tableheader = `<table class="table table-light text-center align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Problem Name</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">Difficulty</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>`;
        tableheader+="<tbody>";
        tabledata.forEach(element => {
            tableheader+="<tr>";
            tableheader+=("<td>"+element['prob_name']+"</td>");
            tableheader+=("<td>"+element['score']+"</td>");
            if(element['diff']==1)
            {
                tableheader+=("<td>Easy</td>");
            }
            if(element['status']==0)
            {
                tableheader+=('<td class="text-danger fw-bold">Unsolved</td>');
            }
            else
            {
                tableheader+=('<td class="text-success fw-bold">Solved</td>');
            }
            tableheader+=('<td><Button type="button" class="btn btn-success btn-sm">Solve</Button></td>');
            tableheader+="</tr>";
        });
        tableheader+="</tbody></table>";
        tablediv.innerHTML = tableheader;
    }
    else
    {
        tablediv.innerHTML='<h5 class="text-center">No Content to display!</h5>';
    }
    if(document.getElementById('c-btn').classList.contains('active'))
        document.getElementById('c-btn').classList.remove('active');
    if(document.getElementById('ds-btn').classList.contains('active'))
        document.getElementById('ds-btn').classList.remove('active');
    if(document.getElementById('j-btn').classList.contains('active'))
        document.getElementById('j-btn').classList.remove('active');
    btn.classList.append('active');
}