setTimeout(ck, 4);
function ck(){
  const form = document.getElementById('field');
  let arr = [];
  for(let i = 0; i < 9; i++){
    arr.push(form[i].value);
  }

  for(let i = 0; i < 9; i+=3){
    if(arr[i] == "+" && arr[i+1] == "+" && arr[i+2] == "+"){
      alert('ВЫ ПОБЕДИЛИ');
    }else if(arr[i] == "o" && arr[i+1] == "o" && arr[i+2] == "o"){
      alert('ПОБЕДИЛ СКАЙНЕТ');
    }
  }
  for(let i = 0; i < 3; i++){
    if(arr[i] == "+" && arr[i+3] == "+" && arr[i+6] == "+"){
      alert('ВЫ ПОБЕДИЛИ');
    }else if(arr[i] == "o" && arr[i+3] == "o" && arr[i+6] == "o"){
      alert('ПОБЕДИЛ СКАЙНЕТ');
    }
  }
  if((arr[0] == "+" && arr[4] == "+" && arr[8] == "+")||(arr[2] == "+" && arr[4] == "+" && arr[6] == "+")){
    alert('ВЫ ПОБЕДИЛИ');
  }
  if((arr[0] == "o" && arr[4] == "o" && arr[8] == "o")||(arr[2] == "o" && arr[4] == "o" && arr[6] == "o")){
    alert('ПОБЕДИЛ СКАЙНЕТ');
  }
}
