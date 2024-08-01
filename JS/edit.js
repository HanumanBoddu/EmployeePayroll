const user = JSON.parse(localStorage.getItem('editUser'));
if (user) {
    // Prefill the form fields with user data
    $('#inputEmail3').val(user.name);
    $(`input[name="profile-image"][value="${user.image}"]`).prop('checked', true);
    $(`input[name="gridRadio"][value="${user.gender}"]`).prop('checked', true);
    user.department.forEach(dept => {
        $(`input[name="gridRadios"][value="${dept}"]`).prop('checked', true);
    });
    $('#inputSalary').val(user.salary);
    const [startDay, startMonth, startYear] = user.startDate.split('/');
    $('#inputDay').val(startDay);
    $('#inputMonth').val(startMonth);
    $('#inputYear').val(startYear);

    // Clear the user data from local storage
     localStorage.removeItem('editUser');
}