const pass_len=document.querySelector('.pass-count');
const input_range=document.querySelector('.input_range');
const num_checkbox=document.querySelector('#numbers');
const symb_checkbox=document.querySelector('#symbols');
const upper_checkbox=document.querySelector('#upper-case');
const lower_checkbox=document.querySelector('#lower-case');
const strength_color_div=document.querySelector(".strength-color");
const pass_gen_button=document.querySelector('.generate-container');

let symbol_string="!~`#$%^&*()_-+=}{[]<,>.?/|";

//all id selector array
let check_arr=[num_checkbox,symb_checkbox,upper_checkbox,lower_checkbox];

//current checkbox checked
let curr_ckeck=[];

//current length of password to generate
let password_length=10;

//count of check box to be checked true
let check_count=0;

//the final password
let password="";

function handle_passlength(){
    pass_len.innerHTML=password_length;
    input_range.value=password_length;
}
//event for change in range input
input_range.addEventListener('change', (e)=>{
    password_length=input_range.value;
    handle_passlength();
});

//fun to count the checked_count

function checking_count()
{
    check_count=0;
    check_arr.forEach((ele)=>{
        if(ele.checked===true)
        {
            check_count++;
        }
    });

    if(check_count>password_length)
    {
        password_length=check_count;
        handle_passlength();
        
    }
    console.log(check_count);
}
check_arr.forEach((ele)=>{

    ele.addEventListener('click', checking_count);
});

//fun for add color of strength
function strength_indicator(color)
{
    strength_color_div.style.backgroundColor=color;
}

function curr_checked_fun()
{
    curr_ckeck=[];
    for(let i=0;i<check_arr.length;i++)
    {
        if(check_arr[i].checked===true)
        {
            curr_ckeck.push(check_arr[i]);
        }
    }
    
}

//fun to conclude the  strength of password
function calc_strength()
{
    
    curr_checked_fun();

    if(curr_ckeck.length>=3 && password_length>=8)
    {
        strength_indicator("#00FF00");
    }
    else if(symb_checkbox.checked && lower_checkbox.checked && password_length>=8)
    {
        strength_indicator("#00FF00");
    }
    else{
        strength_indicator("#FF0000")
    }
}

function getRandNumber(min,max)
{
    let num=Math.random()*(max-min);
    num=Math.floor(num);
    num=num+min;
    return num;
}
function getRandomInteger()
{
    let min=0;
    let max=9;
   
    return getRandNumber(min,max);


}
function getRandUpperCase(){
    let num=getRandNumber(65,90);
     
    return String.fromCharCode(num);
}
function getRandLowerCase() {
    let num=getRandNumber(97,122);
    
    return String.fromCharCode(num);
}

function getsymbol()
{
    let size=symbol_string.length-1;
    let num=getRandNumber(0,size);
    console.log(symbol_string[num]);
    return symbol_string[num];

}


function generate_pass_fun()
{
    curr_checked_fun();
    password="";
    let fun_arr=[];

   
        if(num_checkbox.checked===true)
            fun_arr.push(getRandomInteger);
        if(symb_checkbox.checked===true)
            fun_arr.push(getsymbol);
        if(lower_checkbox.checked===true)
            fun_arr.push(getRandLowerCase);
        if(upper_checkbox.checked===true)
            fun_arr.push(getRandUpperCase);

        // fun_arr.forEach((ele)=>{
        //     console.log(ele);
        // })

        for(let i=0;i<fun_arr.length;i++)
        {
            password+=fun_arr[i]();
            console.log(password);
        }

        let remaining=password_length-fun_arr.length;
        for(let i=0;i<remaining;i++)
        {
            let index=getRandNumber(0,fun_arr.length);
            console.log(index);
            password+=fun_arr[index]();
        }


        console.log(password);
   

}


pass_gen_button.addEventListener('click',generate_pass_fun);

