function viewStudentGrade(){
    const studentName = document.getElementById('studentName').value;
    fetch(`http://127.0.0.1:5000/grades/${studentName}`,{
        method: 'GET',
        redirect: 'follow'
        })
       .then(response => response.json())
       .then(result => {
        const table = document.getElementById('table');
        table.innerHTML='';
    
            const row = document.createElement('tr');
            const names = document.createElement('td');
            const grades = document.createElement('td');

            names.textContent = result.name;
            grades.textContent = result.grade;
            row.appendChild(names);
            row.appendChild(grades);
            table.appendChild(row)
       })
    
       .catch(error => console.log('error',error))
    }

function viewAllGrades(){
    fetch(`http://127.0.0.1:5000/grades`,{
        method: 'GET',
        redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {
            const table = document.getElementById('table');
            table.innerHTML='';
            
            result.forEach(student => {
                //const grade = result[name];
                const row = document.createElement('tr');
                const names = document.createElement('td');
                const grades = document.createElement('td');

                names.textContent = student.name;
                grades.textContent = student.grade;
                row.appendChild(names);
                row.appendChild(grades);
                table.appendChild(row)
            });
           
        })
        .catch(error => console.log('error',error))
        }

function addStudentGrade(){
    const newStudentName = document.getElementById('inputName').value;
    const newStudentGrade = document.getElementById('inputGrade').value;
        fetch(`http://127.0.0.1:5000/grades`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": newStudentName,
                "grade": newStudentGrade
            }),
            redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error',error))
            }
function editStudentGrade(){
    const editStudentName = document.getElementById('editName').value;
    const editStudentGrade = document.getElementById('editGrade').value;
        fetch(`http://127.0.0.1:5000/grades/${editStudentName}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "grade": editStudentGrade
                }),
                redirect: 'follow'
                })
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error',error))
            }

function delStudentGrade(){
    const delStudentName = document.getElementById('delName').value;
        fetch(`http://127.0.0.1:5000/grades/${delStudentName}`,{
                method: 'DELETE',
                redirect: 'follow'
                })
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error',error))
            }
            
document.getElementById('viewStudentGrade').addEventListener('click',viewStudentGrade);
document.getElementById('viewAllGrades').addEventListener('click',viewAllGrades);
document.getElementById('addStudentGrade').addEventListener('click',addStudentGrade);
document.getElementById('editStudentGrade').addEventListener('click',editStudentGrade);
document.getElementById('delStudentGrade').addEventListener('click',delStudentGrade);

window.onload = viewAllGrades;