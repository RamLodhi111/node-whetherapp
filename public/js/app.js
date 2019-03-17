console.log('Client side JS file loaded');

//Fetch API to get response from below API and dump on browser console
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
// response.json().then((data)=>{
//     console.log(data);
// })
// })

//Fetch API to get response from our API and dump on browser console
// fetch('http://localhost:3000/?loc=Bhopal').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.place);
//             console.log(data);
//         } })
//     })

const whetherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error-message');
const successMessage = document.querySelector('#success-message');

whetherForm.addEventListener('submit',(e)=>{
    errorMessage.textContent='Loading';
    successMessage.textContent='';
    //To prevent auto reload of form/page once submittted
    e.preventDefault();
    const location = search.value;
    console.log(location)
    //http://localhost:3000/?loc=
    
    fetch('/?loc='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           // console.log(data.error);
            errorMessage.textContent=data.error;
        }else{
            errorMessage.textContent=data.location;
            successMessage.textContent=data.summary;
            // console.log(data.location);
            // console.log(data.summary);
        } })
    })
})