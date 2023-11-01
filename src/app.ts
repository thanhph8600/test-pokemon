var audio01 = document.getElementById('audio-01')
var audio02 = document.getElementById('audio-02')
var audio03 = document.getElementById('audio-03')

audio01.volume = 0.1

let pokemon : {
    id:number,
    name: string,
    image: string,
    type: string,
}

var lever = 2
async function getPokemon(){
    document.querySelector('#app').innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
    let listPokemon: Object[] = [];
    let arrID: number[]=[]
    for (let i = 0; i < lever; i++) {
        arrID.push(Math.round(Math.random()*1000))        
    }
    

    for (let i = 0; i < lever; i++) {
        
        let data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${arrID[i]}`)
        let keke: any = await data.json()
        pokemon = {
            id: keke.id,
            name: keke.name,
            image: keke.sprites.front_default,
            type: keke.types[0].type.name
        }        
        listPokemon.push(pokemon)        
        listPokemon.push(pokemon)        
    }
    listPokemon = _.shuffle(listPokemon)
    return listPokemon
}

function htmlItemPokemon(item){
    return `
            <div class="detailItem">
                <div data="${item.id}" class="item idPokemon-${item.id}">
                    <img src="${item.image}">
                    <p>#${item.id}</p>
                </div>
            </div>
            `
}

async function renderPokemon() {
    let listPokemon =await getPokemon()
    var html = listPokemon.map(item=>{
        return htmlItemPokemon(item)
    })
    document.querySelector('#app').innerHTML = html.join('')
    var item = document.querySelectorAll('.item')
    setTimeout(() => {
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            element.classList.add('before')
        }
    }, 1000);   
}
renderPokemon()


let closeTime = (item?:any[],time?:number) => {
    setTimeout(() => {
        closeImg(item)
    }, time);
}
let timeoutId = closeTime();
let countItem:number = lever*2;
let checkChoose: number = 0;
let choose: any[] = [];
let checkTimeOut:boolean = false;

$(document).on('click','.before',function(){
    checkChoose +=1;

    clearTimeout(timeoutId)
    if(choose.length==2){
        choose.forEach(element => {
            element.addClass('before')
        });
    }

    if(checkChoose==1){
        choose = []
        var item =  $(this).removeClass('before');
        choose.push(item)
    }else{
        audio02.pause();
        audio03.pause();
    
        checkChoose=0

        var item =  $(this).removeClass('before');
        choose.push(item)
        if(checkTrueFalse(choose)){
            audio02.currentTime = 0;
            audio02.play()
            chooseTrue(choose)
            countItem -= 2
            
            if(countItem == 0){
                lever = lever + 1
                countItem = lever * 2

                setTimeout(() => {
                    $('h2').html(`Ke Ke lever ${lever-1}`)
                    alert("Bạn giỏi quá Tới màng tiếp theo nào")
                    renderPokemon()
                }, 0);
            }
        }else{
            audio03.currentTime = 0;
            audio03.play()
            closeTime(choose,1000)
        }
        checkTimeOut = true
    }

})



function closeImg(listItem){
    listItem.forEach(element => {
        element.addClass('before')
    });
}

function checkTrueFalse(listItem){
    
    if(listItem[0].attr('data') != listItem[1].attr('data')){
        return false
    }else{
        return true
    }
}

function chooseTrue(listItem){
    listItem.forEach(element => {
        element.addClass('chooseTrue')
        element.removeClass('before')
    });
    setTimeout(() => {
        listItem.forEach(element => {
            element.remove()
        });
    }, 500);
}
