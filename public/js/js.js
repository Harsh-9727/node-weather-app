// console.log('i am fool')
fetch('http://puzzle.mead.io/puzzle').then((response) => {
response.json().then((data)=>{
    console.log(data)
})
})
    
const form = document.querySelector('form')
const search=document.querySelector('input')
const mssgOne=document.querySelector('#mssg-1')
const mssgTwo=document.querySelector('#mssg-2')
//const mssgThree=document.querySelector('#mssg-3')


form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    mssgOne.textContent='loading'
    mssgTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                mssgOne.textContent= data.error
               // mssgTwo.textContent= data.error
            }
            else{
             //   console.log(data.forecast)
            //console.log(data.location)
            mssgOne.textContent= data.forecast
            mssgTwo.textContent=data.location
            }
        })
    })
console.log(location)

})