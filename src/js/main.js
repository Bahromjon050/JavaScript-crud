

let form = document.querySelector('form'),
    inputOn = document.querySelectorAll('.inputON'),
    tbody = document.querySelector('tbody')

let data = JSON.parse(localStorage.getItem('data')) || [],
    result = true,
    submit = document.querySelector('.submit');


const tbodyFun = () => {
    data = JSON.parse(localStorage.getItem('data')) || []
    tbody.innerHTML = ''
    if (data.length) {
        data.forEach((val, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${val.name}</td>
                    <td>${val.email}</td>
                    <td>${val.des}</td>
                    <td><button type="button" onclick="show(${i})" class="btn btn-warning" style='color: var(--bs-light);'>Show</button></td>
                    <td><button type="button" onclick="edit(${i})" class="btn btn-success">Edit</button></td>
                    <td><button type="button" onclick="del(${i})" class="btn btn-danger">Delete</button></td>
                </tr>
            `
        })
    } else {
        tbody.innerHTML = `<h1 class='text-center'>Ma'lumot yo'q</h1>`
    }
}
tbodyFun()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (obj) {
        if (result) {
            console.log('add');
            submit.textContent = 'Add'
            localStorage.setItem('data', JSON.stringify([...JSON.parse(localStorage.getItem('data')) || [], { ...obj, id: new Date().getTime() }]))
            tbodyFun()
        } else {
            console.log('edit');
            localStorage.setItem('data', JSON.stringify(data.map((val) => val.id === obj.id ? obj : val)))
            tbodyFun()
        }
        obj = {}
        inputOn.forEach((val) => {
            val.value = ''
        })
        result = true
        textFun()
    }
})

const textFun = () => {
    if (result) {
        submit.textContent = 'Add'
    } else {
        submit.textContent = 'Edit'
    }
}
textFun()

let obj = {}

inputOn.forEach((val) => {
    val.addEventListener('input', (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        obj = {
            ...obj, [e.target.name]: e.target.value
        }
    })
})

const del = (i) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            localStorage.setItem('data', JSON.stringify(
                JSON.parse(localStorage.getItem('data')).filter((val) => val.id !== data[i].id)
            ))
            tbodyFun()
        }
    })
}

let index = null

const edit = (i) => {
    result = false
    index = i
    obj = data[i]
    inputOn.forEach((val) => {
        val.value = data[i][val.name]
    })
    textFun()
    console.log(obj);
}

const show = (i) => {
    Swal.fire({
        title: data[i].name,
        text: data[i].des,
    })
}