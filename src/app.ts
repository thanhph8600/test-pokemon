let pokemon : {
    id:number,
    name: string,
    image: string,
    type: string,
}

async function getPokemon(){
    document.querySelector('#app').innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
    let listPokemon: Object[] = [];
    const pokemons: number = 10;
    let arrID: number[]=[]
    for (let i = 0; i < 10; i++) {
        arrID.push(Math.random()*1000)        
    }
    for (let i = 1; i <= pokemons; i++) {
        let data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
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
                <div data="${item.id}" class="item before idPokemon-${item.id}">
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
}
renderPokemon()


let closeTime = (item?:any[],time?:number) => {
    setTimeout(() => {
        closeImg(item)
    }, time);
}
let timeoutId = closeTime();
let countItem:number = 20;
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
        checkChoose=0

        var item =  $(this).removeClass('before');
        choose.push(item)
        if(checkTrueFalse(choose)){
            chooseTrue(choose)
            countItem -= 2
            console.log(countItem);
            
            if(countItem == 0){
                countItem=20
                alert("Bạn giỏi quá")
                renderPokemon()
            }
        }else{
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
