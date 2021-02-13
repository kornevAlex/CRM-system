document.addEventListener('DOMContentLoaded', async function () {
    setTimeout(function(){
        for(let el of document.querySelectorAll('.modal')){
            el.classList.remove('overlay__start')
        }
    }, 400)

    const errorField = document.querySelector('.error')
    const formClose = document.querySelector(".form__close")
    const modalClose = document.querySelectorAll(".modal__close")
    const formCancel = document.querySelector(".form__cancel")
    const addClient = document.querySelector('.addClient')
    const btnAddContact = document.querySelector('.btn__addContact')
    const modalForm = document.querySelector('#form__addClient')
    const contactField = document.querySelector('.form__contact')
    const inputMiddleName = document.querySelector('#middle-name')
    const tblBtn = document.querySelectorAll('.tbl__button')
    const deleteClient = document.querySelector('.form__delete__contact')
    const contentTitle = document.querySelector('.content__title')
    const btnBifacial = document.getElementById('btn__bifacial')
    let fieldEntry = document.querySelector('.header__input')
    let itsTrue = false
    let timer
    let change
    /*Функции модального окна */
    function closeModal(e) {
        this.parentNode.classList.remove("open")
        const parent = this.parentNode.parentNode
        setTimeout(function () {
            parent.classList.remove("open")
        }, 350);
    }

    async function fieldAddClient(e) {
        e.stopImmediatePropagation;
        localStorage.removeItem('id')
        const fullName = document.querySelectorAll('.modal__input')
        const modal = document.getElementById('modal1')

        modal.parentNode.classList.add("open");
        btnBifacial.removeEventListener('click', onDelete)

        for (let el of fullName) {
            el.value = ''
            if (el.id === 'middle-name') el.nextElementSibling.classList.remove('lbl__valid')
        }

        contentTitle.innerHTML = `Новый клиент`
        btnBifacial.innerHTML = 'Отмена'


        setTimeout(function () {
            modal.classList.add("open");
        }, 350);

    }

    function closeUpdateClientsModal() {
        const contactField = document.querySelectorAll('.add__contact__field')
        const addContactBtn = document.querySelector('.form__contact')
        this.parentNode.classList.remove("open")
        const parent = this.parentNode.parentNode
        setTimeout(function () {
            parent.classList.remove("open")
            addContactBtn.style.height = '35px'

            contactField.forEach(el => {
                el.remove()
            })
        }, 350);
    }

    function deleteClassMiddleName() {
        if (!this.value) this.nextElementSibling.classList.remove('lbl__valid')
    }
    function addClassInputMiddleName() {
        this.nextElementSibling.classList.add('lbl__valid')
    }

    function createContactField(type = '', value = '') {
        let s = 0
        const contacts = document.querySelectorAll('.add__contact__field')
        const arrContact = [
            { inner: 'Facebook', value: ' facebook' },
            { inner: 'Телефон', value: 'tel' },
            { inner: 'Email', value: 'email' },
            { inner: 'VK', value: 'vk' },
            { inner: 'Другое', value: ' another' },
        ]
        const addContact = document.createElement('div')
        const contactSelect = document.createElement('select')
        const contactInput = document.createElement('input')
        const contactButton = document.createElement('button')

        addContact.classList.add('add__contact__field')
        contactInput.classList.add('add__contact__input')
        contactButton.classList.add('add__contact__button')
        addContact.classList.add('animated')

        contactInput.required = true
        contactButton.type = 'button'
        contactInput.placeholder = 'Введите данные контакта'

        addContact.append(contactSelect, contactInput, contactButton)
        contactField.prepend(addContact)


        if (value) contactInput.value = value
        contactButton.addEventListener('click', deleteContact)
        setTimeout(function name() {
            const height = this.offsetHeight + 2
            this.style.height = `${height}px`
            s++

            if (contacts.length === 0 && s < 43) {
                setTimeout(name.bind(contactField), 0.1)
            }

            else if (s < 31 && contacts.length !== 0) {
                setTimeout(name.bind(contactField), 0.1)
            }
        }.bind(contactField), 0.1)

        for (let cont of arrContact) {
            const option = document.createElement('option')
            option.textContent = cont.inner
            contactSelect.append(option)
            if (type === cont.inner) {
                option.selected = true

            }

        }



        if (contacts.length === 2) {
            document.querySelector('.modal').style.overflow = 'auto'
        }
        else if (contacts.length < 1) {
            document.querySelector('.modal').style.overflow = 'hidden'
        }
        if (contacts.length === 9) {
            let s = 0

            setTimeout(function name() {
                const height = this.offsetHeight - 2
                this.style.height = `${height}px`
                s++
                if (s < 17) setTimeout(name.bind(contactField), 0.1)
            }.bind(contactField), 0.5)
            btnAddContact.style.display = 'none'
            itsTrue = true
        }
        const select = new Choices(contactSelect, {
            searchEnabled: false,
            shouldSort: false
        })
        contactSelect.addEventListener(
            'addItem',
            whyContact
        )
        contactInput.addEventListener('input', deleteError)
    }

    function deleteContact() {
        let s = 0
        const contacts = document.querySelectorAll('.add__contact__field')
        setTimeout(function name() {
            const height = this.offsetHeight - 2
            this.style.height = `${height}px`
            s++
            if (contacts.length === 1 && s < 43) setTimeout(name.bind(contactField), 0.1)
            else if (s < 31 && contacts.length !== 1) setTimeout(name.bind(contactField), 0.1)
        }.bind(contactField), 0.1)

        if (contacts.length < 11 && itsTrue) {
            let s = 0
            setTimeout(function name() {
                const height = this.offsetHeight + 2
                this.style.height = `${height}px`
                s++
                if (s < 17) setTimeout(name.bind(contactField), 0.1)
            }.bind(contactField), 0.5)
            btnAddContact.style.display = 'block'
            itsTrue = false
        }
        this.parentNode.remove()

    }
    function deleteError(){
        errorField.style.display = 'none'
    }

    function whyContact(event) {
        const input = this.parentNode.parentNode.nextElementSibling
        const cloneInput = input.cloneNode(true)
        input.parentNode.replaceChild(cloneInput, input)
        function mask(event) {
            const keyCode = event.keyCode;
            const template = '+7 (___) ___-__-__',
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        cloneInput.value = ''
        cloneInput.addEventListener('input', deleteError)
        switch (event.detail.value) {
            case 'Телефон':
                cloneInput.type = 'tel'
                cloneInput.addEventListener("input", mask);
                cloneInput.addEventListener("focus", mask);
                cloneInput.addEventListener("blur", mask);
                break
            case 'Email':
                cloneInput.type = 'email'
                break
            case 'VK':
                cloneInput.type = 'text'
                cloneInput.addEventListener("focus", function () {
                    this.value = 'vk.com/'
                
                });
                break
            default:
                cloneInput.type = 'text'
        }
    }
    /*Запись и перезапись*/
    async function clientAddSubmit(id = '') {
        let check = true
        const errorDescription = document.querySelector('.error__description')
        const fullName = document.querySelectorAll('.modal__input')
        const surname = fullName[0].value,
            name = fullName[1].value,
            lastName = fullName[2].value
        const arrContact = []
        const contacts = document.querySelectorAll('.add__contact__input')
        if (contacts.length) {
            for (let el of contacts) {
                const obj = {
                    type: el.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.value,
                    value: el.value
                }
                arrContact.push(obj)
                const regEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
                const regA = /^(https?:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/
                console.log(obj.value.length)
                switch (obj.type) {
                    case 'Email':
                        if (!regEmail.test(obj.value)) check = false
                        errorDescription.innerHTML = 'Ошибка, почта указана в неверном формате'
                        break
                    case 'Телефон':
                        if (obj.value.length !== 18) check = false
                        errorDescription.innerHTML = 'Ошибка, телефон указан в неверном формате'
                        break
                    case 'VK':
                    case 'Facebook':
                    case 'Другое':
                        if(!regA.test(obj.value)) check = false
                        errorDescription.innerHTML = 'Ошибка, должна быть ссылка: http://vk.com'
                        break

                }
            }

        }
        /*Отправка на сервер */
        if (check) {
            errorField.style.display = 'none'
            if (id) {
                await fetch(`http://localhost:3000/api/clients/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name,
                        surname,
                        lastName,
                        contacts: arrContact,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },

                })
            }
            else {
                await fetch('http://localhost:3000/api/clients', {
                    method: 'POST',
                    body: JSON.stringify({
                        name,
                        surname,
                        lastName,
                        contacts: arrContact,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },

                })
            }
            renderTable(await getData())
            closeUpdateClientsModal.apply(document.getElementById('modal1'))
        }
        else {
            errorField.style.display = "block"
        }

    }
    /*Изменение клиента */
    async function updateClient(e) {
        e.stopImmediatePropagation;
        const modal = document.getElementById('modal1')
        const id = this.parentNode.parentNode.parentNode.firstElementChild.textContent
        const client = await getData(id)
        const fullName = document.querySelectorAll('.modal__input')
        let surname = fullName[0],
            name = fullName[1],
            lastName = fullName[2]
        localStorage.setItem('id', JSON.stringify(this.parentNode.parentNode.parentNode.firstElementChild.textContent))
        contentTitle.innerHTML = `Изменить клиента &nbsp;<span>ID: ${client.id}</span>`
        surname.value = client.surname
        name.value = client.name
        lastName.value = client.lastName || ''
        lastName.value.length !== 0 ? addClassInputMiddleName.apply(lastName) : null
        btnBifacial.innerHTML = 'Удалить клиента'
        btnBifacial.addEventListener('click', onDelete)

        client.contacts.map(el => {
            createContactField(el.type, el.value)

        })
        modal.parentNode.classList.add("open");
        setTimeout(function () {
            modal.classList.add("open");
        }, 350);

    }

    /*Вызов окна удаления */

    function deleteClients(e) {
        e.stopImmediatePropagation;
        const modal = document.getElementById('modal__delete')
        localStorage.setItem('id', JSON.stringify(this.parentNode.parentNode.parentNode.firstElementChild.textContent))
        modal.parentNode.classList.add('open')
        setTimeout(function () {
            modal.classList.add("open");
        }, 350);

    }

    /*Отрисовка таблицы */
    async function renderTable(arr) {
        document.querySelector(".addClient").classList.remove('closed')
        const tbody = document.querySelector('tbody')
        tbody.innerHTML = ''
        const newArr = transformData(arr)
        newArr.map(el => {
            const tr = document.createElement('tr')
            tr.classList.add('tbl__body__tr')

            for (const i in el) {
                const td = document.createElement('td')
                td.classList.add('tbl__td')
                tr.append(td)
                if (i === 'id') {
                    td.innerHTML = `<span class ='txt__gray tbl__id'>${el[i]}</span>`
                    tr.id = el[i]
                }
                else if (i === 'contacts' && i.length > 0) {
                    const contList = document.createElement('ul')
                    contList.classList.add('contact__list')
                    el[i].map(el => {
                        const contact = document.createElement('li')
                        const contHref = document.createElement('a')
                        const contact_value = document.createElement('span')
                        contHref.classList.add('cont__href')
                        contact_value.classList.add('contact_value')
                        contact.classList.add('contact')
                        switch (el.type) {
                            case 'Телефон':
                                contHref.innerHTML = `<i class = 'fa fa-phone'></i>`
                                contHref.href = `tel:${el.value}`
                                contact.classList.add('contact__mobile')
                                break
                            case 'VK':
                                contHref.innerHTML =  `<i class = 'fa fa-vk'></i>`
                                contHref.href = el.value
                                break
                            case 'Facebook':
                                contHref.innerHTML =  `<i class = 'fa fa-facebook'></i>`
                                contHref.href = el.value
                                contact.classList.add('contact__facebook')
                                break
                            case 'Email':
                                contHref.innerHTML = `<i class = 'fa fa-envelope-o'></i>`
                                contHref.href = `mailto:${el.value}`
                                break
                            case 'Другое':
                                contHref.innerHTML =  `<i class = 'fa fa-user'></i>`
                                contHref.href = el.value
                        }
                        contact_value.innerHTML = `${el.type}:
                        <b>${el.value}</b>`
                        contact.append(contHref,contact_value)
                        contList.append(contact)
                        td.append(contList)
                    })
                }
                else td.innerHTML = el[i]
            }
            tbody.append(tr)
        })
        /*Функции изменения и удаления клиентов */
        const tblBtn = document.querySelectorAll('.tbl__btn')
        for (let el of tblBtn) {
            el.firstElementChild.addEventListener('click', updateClient)
            el.lastElementChild.addEventListener('click', deleteClients)
        }
    }
    /*Преобразование входящих данных в нужный нам массив */
    function transformData(arr) {
        const newArr = arr.map(el => {
            const dateCreate = new Date(el.createdAt)
            const dateChange = new Date(el.updatedAt)

            return {
                id: el.id,
                fullName: `${el.surname} ${el.name} ${el.lastName}`,
                dateCreate: `${dateCreate.getDate() < 10 ? `0${dateCreate.getDate()}` : dateCreate.getDate()}.${dateCreate.getMonth() + 1 < 10 ? `0${dateCreate.getMonth() + 1}` : dateCreate.getMonth() + 1}.${dateCreate.getFullYear()}
                        &nbsp
                        <span class ='txt__gray'>${dateCreate.getHours() + 1 < 10 ? `0${dateCreate.getHours() + 1}` : dateCreate.getHours() + 1}:${dateCreate.getMinutes() + 1 < 10 ? `0${dateCreate.getMinutes() + 1}` : dateCreate.getMinutes() + 1}</span>
                        `,
                dateChange: `${dateChange.getDate() < 10 ? `0${dateChange.getDate()}` : dateChange.getDate()}.${dateChange.getMonth() + 1 < 10 ? `0${dateChange.getMonth() + 1}` : dateChange.getMonth() + 1}.${dateChange.getFullYear()} 
                &nbsp
                <span class ='txt__gray'>${dateChange.getHours() + 1 < 10 ? `0${dateChange.getHours() + 1}` : dateChange.getHours() + 1}:${dateChange.getMinutes() + 1 < 10 ? `0${dateChange.getMinutes() + 1}` : dateChange.getMinutes() + 1}</span>
                `,
                contacts: el.contacts,
                change: `
            <div class='tbl__btn'>
                <button class='tbl__change__btn' data-modal='#modal1'>Изменить</button>
                <button class='tbl__delete__btn' data-modal='#modal__delete'>Удалить</button>
            </div>`,
            }
        })
        return newArr
    }
    async function getData(id = '') {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`)
        const result = await response.json()
        return result
    }

    /*Поиск по массиву */

    async function searchClient() {
        const arr = await getData()
        const newArr = arr.filter(el => {
            for (let i in el) {
                if (typeof el[i] === 'string') {
                    if (el[i].toLowerCase().includes(fieldEntry.value.toLowerCase())) return true
                }
                else {
                    if (el[i].includes(fieldEntry.value)) return true
                }

            }
        })
        renderTable(newArr)

    }

    /*Сортировка */

    async function sortTable() {
        const arr = await getData()
        let newArr
        switch (this.id) {
            case 'btn__id':
                newArr = arr.sort((a, b) => b.id - a.id)
                break
            case 'btn__name':
                newArr = arr.sort((a, b) => a.surname.charAt(0) > b.surname.charAt(0) ? 1 : -1)
                break
            case 'btn__dateCreate':
                newArr = arr.sort((a, b) => {
                    const dateForA = new Date(a.createdAt)
                    const dateForB = new Date(b.createdAt)
                    return dateForA.getTime() > dateForB.getTime() ? -1 : 1
                })
                break
            case 'btn__dateChange':
                newArr = arr.sort((a, b) => {
                    const dateForA = new Date(a.updatedAt)
                    const dateForB = new Date(b.updatedAt)
                    return dateForA.getTime() > dateForB.getTime() ? -1 : 1
                })
                break
        }
        if (change) {
            renderTable(newArr.reverse())
            this.classList.toggle('btn__up')
            this.classList.toggle('btn__down')
            change = false
        }
        else {
            renderTable(newArr)
            this.classList.toggle('btn__up')
            this.classList.toggle('btn__down')
            change = true
        }
    }

    /*Удаление клиента */
    async function onDelete(e) {
        e.preventDefault()
        const id = JSON.parse(localStorage.getItem('id'))
        const tr = document.getElementById(`${id}`)

        tr.remove()
        fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        closeModal.apply(document.getElementById('modal__delete'))
    }

    renderTable(await getData())


    inputMiddleName.addEventListener('blur', deleteClassMiddleName)
    inputMiddleName.addEventListener('focus', addClassInputMiddleName)
    formClose.addEventListener('click', closeUpdateClientsModal)
    addClient.addEventListener('click', fieldAddClient)
    btnAddContact.addEventListener('click', createContactField)
    formCancel.addEventListener('click', closeModal)

    modalForm.addEventListener('submit', function (even) {
        even.preventDefault()
        let id = JSON.parse(localStorage.getItem('id'))
        if (id) clientAddSubmit(id)
        else clientAddSubmit()
    })

    deleteClient.addEventListener('click', onDelete)

    fieldEntry.addEventListener('input', () => {
        clearTimeout(timer)
        timer = setTimeout(searchClient, 300)
    })

    for (let el of tblBtn) {
        el.addEventListener('click', sortTable)
    }
    for (let el of modalClose) {
        el.addEventListener('click', closeUpdateClientsModal)
    }
})