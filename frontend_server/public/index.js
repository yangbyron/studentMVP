
fetch('http://localhost:3000/api/list')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        let displayDiv = document.createElement('div');
        let ol = document.createElement('ol');
        data.forEach(list => {
            let li = document.createElement('li');
            li.innerHTML=`${list.description}-${list.added_date}`;
            ol.append(li);
        });
        displayDiv.append(ol);
        document.body.append(displayDiv);
    })