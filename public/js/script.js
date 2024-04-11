

//the code below is able to get data from the database, i should now try to post
// to the database
fetch(`http://localhost:3008/users`)
  .then(res =>{
    return res.json()
  })
  .then(data => {
    let tableData = ""
    data.forEach(user=>{
      
      tableData += `<tr>
          <td>${user.id}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.age}</td>
        </tr>`
        
        document.querySelector('tbody').innerHTML = tableData
        
    })
  })

  //let us post data to the database
  // var firstname
  // var lastname
  // var age
  // var button


  // function updatePost(){
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const age = document.getElementById('age')
    const button = document.querySelector('button')
  
    button.addEventListener('click',(e)=>{
      e.preventDefault()
      var obj = {
        firstname:firstname.value,
        lastname:lastname.value,
        age:age.value
      };
      fetch('http://localhost:3008/users',{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(obj)
      })
      
    })
  // }
//  updatePost()


  