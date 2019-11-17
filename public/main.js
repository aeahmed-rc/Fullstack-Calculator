

const btn=document.querySelector('button')

let result=document.querySelector('h3')
var trash = document.getElementsByClassName("fa-trash");






    Array.from(trash).forEach(function(element) {
          element.addEventListener('click', function(){

            const numone= this.parentNode.parentNode.childNodes[1].innerText
            const numtwo= this.parentNode.parentNode.childNodes[3].innerText
            const division= this.parentNode.parentNode.childNodes[5].innerText
            const add= this.parentNode.parentNode.childNodes[7].innerText
            // const numone=document.getElementsByClassName('spanOne')
            // console.log(numone)
            // const numtwo=document.getElementsByClassName('spanTwo')
            // const division=document.getElementsByClassName('spanThree')
            // const add=document.getElementsByClassName('spanFour')
            fetch('path', {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'numone':numone ,
                'numtwo':numtwo,
                'division':division,
                'add':add



              })
            }).then(function (response) {
              window.location.reload()
            })
          });
    });



  // .then(res =>res.json())
  // .then(response=>{
  //   console.log(response)
  //   console.log(response)
  //   document.querySelector('h3').innerHTML=response.res
  //
  //
  // })

  // stringReveresed(input)
  // checkPalidrome(input)
  // console.log(input)
// })

// function stringReveresed(input){
// let reverse=input.split('').reverse().join('')
// result.appendChild(document.createTextNode(reverse))
// console.log(reverse)
//   return reverse
// }
//
// function checkPalidrome(input,reverse){
//   console.log(input)
//
//   if(input===stringReveresed(input)){
//     let mainElement=document.createElement('section')
//     let element=document.createElement('h4')
//     document.body.appendChild(mainElement)
//     element.appendChild(document.createTextNode('Is A Palindrome'))
//     mainElement.appendChild(element)
//     input.value=""
//     console.log(mainElement)
//
//   }else {
//     let mainElement=document.createElement('section')
//     let element=document.createElement('h4')
//     document.body.appendChild(mainElement)
//     element.appendChild(document.createTextNode('Is not a Palindrome'))
//     mainElement.appendChild(element)
// console.log('no')
//   }
// // if(str===)
// }
