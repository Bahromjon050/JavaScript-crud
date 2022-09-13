

let form = document.querySelector('form'),
    inputOn = document.querySelectorAll('.inputON'),
    tbody = document.querySelector('tbody')

let data = [],
    result = true,
    submit = document.querySelector('.submit');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (result) {
        console.log('add');
        submit.textContent = 'Add'
        localStorage.setItem('data', JSON.stringify([...JSON.parse(localStorage.getItem('data')) || [], { ...obj, id: new Date().getTime() }]))
    } else {
        console.log('edit');
        submit.textContent = 'Edit'
        localStorage.setItem('data', JSON.stringify(JSON.parse(localStorage.getItem('data')).map((val) => val.id === obj ? obj : val)))
    }
    obj = {}
    result = false
    textFun()
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