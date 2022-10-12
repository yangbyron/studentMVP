const url = 'http://localhost:3000/api/list';
//const url = 'https://to-do-list-db-api.onrender.com/api/list';
fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        let displayDiv = document.createElement('div');
        displayDiv.className='displayDiv';
        let ol = document.createElement('ol');
        data.forEach(list => {
            let indexOfT = list.added_date.indexOf('T');
            let added_date=list.added_date.substring(0,indexOfT);
            let li = document.createElement('li');
            li.innerHTML=`${list.description}----added:${added_date}`;
            let editButton = document.createElement('button');
            editButton.textContent='Edit';
            editButton.className=`edit`;
            editButton.id=list.id;
            let deleteButton = document.createElement('button');
            deleteButton.textContent='Delete';
            deleteButton.className=`delete`;
            deleteButton.id=list.id;
            ol.append(li);
            ol.append(editButton);
            ol.append(deleteButton);
        });
        displayDiv.append(ol);
        let banner = document.getElementsByClassName('banner')[0];
        banner.append(displayDiv);
        
        let input=document.getElementsByName('description')[0];
        let submit = document.getElementsByName('submit')[0];
        input.addEventListener('change',()=>{
            if(input.value===''){
                submit.disabled=true;
            }else{
                submit.disabled=false;
            }
        })
        submit.addEventListener('click',()=>{
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({'description': input.value})
            })
        })

        let deleteButtons = document.querySelectorAll('button.delete');
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click',(e)=>{
                fetch(`${url}/${e.target.id}`,{
                    method: 'DELETE'
                }).then(()=>{
                    location.reload();
                })
            })
        });

        let editButtons = document.querySelectorAll('button.edit');
        editButtons.forEach(editButton => {
            editButton.addEventListener('click',(e)=>{
                document.body.innerHTML='';
                let label = document.createElement('label');
                label.innerHTML='Update list: ';
                let input = document.createElement('input');
                input.name='description';
                let update = document.createElement('input');
                input.required=true;
                update.type='submit';
                update.disabled=true;
                document.body.append(label);
                document.body.append(input);
                document.body.append(update);
                input.addEventListener('change',()=>{
                    if(input.value===''){
                        update.disabled=true;
                    }else{
                        update.disabled=false;
                    }
                })
                update.addEventListener('click',()=>{
                    fetch(`${url}/${e.target.id}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({'description': input.value})
                    }).then(()=>{
                        location.reload();
                    })
                })                
                
            })
        });
    })