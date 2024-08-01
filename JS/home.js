$(document).ready(function() { 
        // $(".searchbtn").click(function(){
        //   $(this).replaceWith('<input type="text" id="searchInput" placeholder="Search users..."><button id="searchButt">Search</button>');
        //   $('#searchButt').on('click', function() {
        //       const searchTerm = $('#searchInput').val().toLowerCase();
        //       $.ajax({
        //           url: 'http://localhost:3000/users',
        //           method: 'GET',
        //           contentType: 'application/json',
        //           success: function(data) {
        //               const filteredUsers = data.filter(user => 
        //                   user.name.toLowerCase().includes(searchTerm)
        //               );
        //               displayUsers(filteredUsers);
        //           }
        //       });
        //   });
        // });


    function fetchAndDisplayUsers() {
        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'GET',
            contentType: 'application/json',
            success: function(data) {
                displayUsers(data);
            }
        });
    }


    function displayUsers(users) {
        const userTableBody = $('#userTableBody');
        userTableBody.empty(); 
         users.forEach(user => {
            const userRow = `
            <tr>
                 <td><img class="profilepic" src="${user.image}" style="height: 30px; width: 35px; border-radius: 2px; border: none;"></td>
                 <td>${user.name}</td>
                 <td>${user.gender}</td>
                 <td>
                   <div class="department">
                      <div class="departmentType Sales">Sales</div>
                      <div class="departmentType HR">HR</div>
                      <div class="departmentType Finance">Finance</div>
                   </div>
                 </td>
                 <td>${user.salary}</td>
                 <td>${user.startDate}</td>
                 <td>
                   <div class="action">
                      <button class="icon-btn" onclick="editUser('${user.id}')" ><img src="../Assets/icons/create-black-18dp.svg"></button>
                      <button class="icon-btn" onclick="deletemploy('${user.id}')"><img src="../Assets/icons/delete-black-18dp.svg"></button>
                   </div>
                 </td>
        </tr>
        `;
            userTableBody.append(userRow);
        });
    }

    fetchAndDisplayUsers();

    //Add User Functionality
    $('#submit').on('click', function() {
        console.log('Submit button clicked');
        const name = $('#inputEmail3').val();
        const image = $('input[name="profile-image"]:checked').val();
        const gender= $('input[name="gridRadio"]:checked').val();
        const department = $('input[name="gridRadios"]:checked').map(function(){
            return $(this).val();
        }).get();
        const salary = $('#inputSalary').val();
        const startDay = $('#inputDay').val();
        const startMonth = $('#inputMonth').val();
        const startYear = $('#inputYear').val();
        const notes = $('#exampleFormControlTextarea1').val();

        const newUser = {
            name: name,
            image: image,
            gender:gender,
            department: department,
            salary: salary,
            startDate: startDay + '/' + startMonth + '/' + startYear,
            notes: notes
        };

        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUser),
            success: function(data) {
                console.log('User added:', data);
                window.opener.location.reload();
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});

function deletemploy(id){
    console.log("at the delete function")
    $.ajax({
        url: 'http://localhost:3000/users/'+id,
        type: 'DELETE',
        success: function (res) {
            console.log(res);
            alert('Data deleted successfully');
            window.opener.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
   };

   function editUser(id){
    console.log("at the edit function")
    $.ajax({
        url: 'http://localhost:3000/users/'+id,
        type: 'GET',
        success: function (data) {
            localStorage.setItem('editUser', JSON.stringify(data));
            window.open('./Templates/home.html');
            // const user = JSON.parse(localStorage.getItem('editUser'));
            // console.log(user);
        },
        error: function (err) {
            console.log(err);
        }
    });
   }

 


 