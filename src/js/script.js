document.addEventListener("DOMContentLoaded", () => {
    let firstFilter = document.querySelector('.js-first-type'),
        secondFilter = document.querySelector('.js-second-type'),
        content = document.querySelector('.contant__table'),
        viewFilter = document.querySelector('.view__row'),
        contentPreview = document.querySelector('.content__wrap-preview'),
        viewLink = [...viewFilter.children],
        tableChildern = [...content.children],
        prev = localStorage.getItem('prev') || 1,
        next = localStorage.getItem('next') || -1,
        value = localStorage.getItem('key') || 'id',
        secondSort = localStorage.getItem('secondSort') || 'up',
        activeViewBtn = localStorage.getItem('view') || 'table',
        activeBlockView = localStorage.getItem('class') || '.content__wrap-preview',
        lang = localStorage.getItem('language') || 'en',
        activeViewFilter =document.getElementById(activeViewBtn),
        activeFirstFilter = document.getElementById(value),
        activeSecondFilter = document.getElementById(secondSort),
        activeBlock = document.querySelector(activeBlockView),
        activeLangBtn = document.getElementById(lang),
        langBtn = document.querySelector('.lang'),
        langDOM = document.querySelectorAll('.js-lang'),
        favorite = document.querySelectorAll('.favorite-icon'),
        previewChildren = [...contentPreview.children];

    // Active button from reload
        activeLangBtn.classList.add('active');
        activeFirstFilter.classList.add('active');
        activeSecondFilter.classList.add('active');
        activeViewFilter.classList.add('active');
        activeBlock.classList.add('d-none');

    // get HTTP
    function getContent(cb) {

        let xhr = new XMLHttpRequest();
        xhr.open('get', 'js/data.json');
        xhr. addEventListener('load', () =>{
            if(xhr.status !== 200) {
                console.log('Error', xhr.status);
                return
            }
            
            let response = JSON.parse(xhr.responseText);
               
            cb(response);
           
        });
 
        xhr.send();
       
    };
    function onGetUsersCallBack(users) {
        
      if (!users.length){
          return;
      }
      renderUserList(users);
     

    }
    // Render User

    function renderUserList(users) {
            if (value === 'id'){
                users.sort(sortByid(users));  
            
            }else if (value === 'name'){
                sortByName(users);
            
            } else {
                sortByAge(users);  
            }
            
        let fragmentTable = users.reduce(
            (acc, user) => acc + newTemplateTable(user), '');
            content.insertAdjacentHTML('afterbegin', fragmentTable);  
        let fragment = users.reduce(
            (acc, user) => acc + newTemplatePreview(user), '');
            
            contentPreview.insertAdjacentHTML('afterbegin', fragment);
    }   
    // sort function
    function sortByid(users) {
        users.sort((a, b) => a.id > b.id ? prev : next);
    }
    function sortByAge(users) {
        users.sort((a, b) => a.age > b.age ? prev : next);
    }
    function sortByName(users) {
        users.sort((a, b) => a.name.en > b.name.en ? prev : next);
       
    }

    // Render Template
    function newTemplateTable(user) {
        return `
        <div class="content__wrap-table">
            <div class="content__image-table">
                <svg class="icon">
                    <use xlink:href="#${user.image}"></use>
                </svg>
            </div>
            <div class="content__name-table">
                ${user.name.en}
            </div>
            <div class="content__age-table">
                ${user.age}
            </div>
            <div class="content__phone-table">
                ${user.phone}
            </div>
            <div class="content__favorit-table">
                <svg class="favorite-icon">
                    <use xlink:href="#star-regular"></use>
                </svg>
            </div>
        </div>
        `
    }

    function newTemplatePreview(user) {
            return `
            <div class="content__preview shadow">
                <div class="content__box">
                    <div class="row">
                        <div class="content__image">
                            <svg class="icon">
                                <use xlink:href="#${user.image}"></use>
                            </svg>
                        </div>
                        <div class="content__name">
                        ${user.name.en}
                        </div>
                        <div class="content__favorit">
                            <svg class="favorite-icon">
                                <use xlink:href="#star-regular"></use>
                            </svg>
                        </div>
                    </div>           
                    <div class="content__preview-age">
                    ${user.age}
                        <span>лет</span>
                    </div>
                    <div class="content__preview-phone">
                    ${user.phone}
                    </div>
                    <div class="content__preview-discription">
                    ${user.phrase.en}
                    </div>
                </div> 
                
               <!-- <div class="video-box" v-if="'>
                    <video controls="controls">
                        <source src="img/${user.video}.mp4" type='video/mp4;'>
                    </video>
                </div> -->
               
            </div>
            `  
    }    
    //View button

    viewFilter.addEventListener('click', function (e) {
            e.preventDefault();
            let viewDataAtr = e.target.dataset.atr
                      
            viewLink.forEach(el => {
                el.classList.remove('active');
            })
            e.target.classList.add('active');

                if (viewDataAtr == 'table'){
                   
                    localStorage.setItem('view', viewDataAtr);
                    localStorage.setItem('class', '.content__wrap-preview');
                    content.classList.add('shadow');
                    content.classList.remove('d-none');
                    contentPreview.classList.add('d-none');
                    
                    return;
            }  
           
            localStorage.setItem('view', viewDataAtr);
            localStorage.setItem('class', '.contant__table');
            contentPreview.classList.remove('d-none');
            content.classList.remove('shadow');
            content.classList.add('d-none');
           
            return;     
        })

    // Clear content containers

    function cleanContent() {
        tableChildern.forEach(el => el.remove());
        previewChildren.forEach(el => el.remove());
    }

    // Sort button

    firstFilter.addEventListener('click', function (e) {
        cleanContent();
        e.preventDefault();
        let link = [...firstFilter.children],
            dataSort = e.target.dataset.atr

        link.forEach(el => {
            el.classList.remove('active');
        });
        e.target.classList.add('active'); 
        if (dataSort === 'name'){
            localStorage.setItem('key', dataSort); 
            window.location.reload();
            return;
        } else if (dataSort === 'id'){
            localStorage.setItem('key', dataSort);
            window.location.reload();  
            return;
            }
            localStorage.setItem('key', dataSort);
            window.location.reload();               
    });
    secondFilter.addEventListener('click', function (e) {
        cleanContent();
        e.preventDefault();

        let link = [...secondFilter.children],
            dataSort = e.target.dataset.atr

        link.forEach(el => {
            el.classList.remove('active');
        });
        e.target.classList.add('active'); 
        if (dataSort === 'up'){
            localStorage.setItem('prev', 1);
            localStorage.setItem('next', -1);
            localStorage.setItem('secondSort', dataSort);
            window.location.reload();
            return ;
            
        }  
            localStorage.setItem('prev', -1);
            localStorage.setItem('next', 1);
            localStorage.setItem('secondSort', dataSort);
            window.location.reload()
            return;
    });

    // Change language
    
    let en = {
        sortTitle: "Sort by",
        viewTitle: 'View',
        name: 'Name',
        age: 'Age',
        up: 'Ascending',
        down: 'Descending',
        table: 'Table',
        preview: 'Previre'
    };

    let ru = {
        sortTitle: "Сортировка",
        viewTitle: 'Вид',
        name: 'Имя',
        age: 'Возраст',
        up: 'По Возрастанию',
        down: 'По Убыванию',
        table: 'Таблица',
        preview: 'Превью'
    }
    loadLanguage(lang);
    function loadLanguage() {
        if (lang == 'en'){
            loadLanguageEn(cleanButton());
            return
        }
        loadLanguageRu(cleanButton());
        return
    }

    function loadLanguageRu() {
            document.getElementById('name').insertAdjacentText('afterbegin', ru.name);
            document.getElementById('age').insertAdjacentText('afterbegin', ru.age);
            document.getElementById('up').insertAdjacentText('afterbegin', ru.up);
            document.getElementById('down').insertAdjacentText('afterbegin', ru.down);
            document.getElementById('table').insertAdjacentText('afterbegin', ru.table);
            document.getElementById('preview').insertAdjacentText('afterbegin', ru.preview);
            document.querySelector('.sort__title').insertAdjacentText('afterbegin', ru.sortTitle);
            document.querySelector('.view__title').insertAdjacentText('afterbegin', ru.viewTitle);
        };
    function loadLanguageEn() {
      
            document.getElementById('name').insertAdjacentText('afterbegin', en.name);
            document.getElementById('age').insertAdjacentText('afterbegin', en.age);
            document.getElementById('up').insertAdjacentText('afterbegin', en.up);
            document.getElementById('down').insertAdjacentText('afterbegin', en.down);
            document.getElementById('table').insertAdjacentText('afterbegin', en.table);
            document.getElementById('preview').insertAdjacentText('afterbegin', en.preview);
            document.querySelector('.sort__title').insertAdjacentText('afterbegin', en.sortTitle);
            document.querySelector('.view__title').insertAdjacentText('afterbegin', en.viewTitle);   
        };
    function cleanButton() {
        langDOM.forEach(el =>el.textContent = '');
    }

    langBtn.addEventListener('click', function (e) {
        cleanButton();
        e.preventDefault();
        let link = [...langBtn.children];
            link.forEach(el => {
                el.classList.remove('active');
            });
            e.target.classList.add('active'); 

        if ( e.target.dataset.atr == 'ru'){
            localStorage.setItem('language', 'ru');
            loadLanguageRu();
            return;
        }
        localStorage.setItem('language', 'en');
        loadLanguageEn()
        return;
    });

    // Favorite

    document.querySelector('.content').addEventListener('click', function (e) {
        console.log(this)
    })
   
    getContent(onGetUsersCallBack);
});
 