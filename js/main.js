document.addEventListener('DOMContentLoaded', async function () {
    const btnAddContact = document.querySelector('.btn__addContact')
    const modalForm = document.querySelector('#form__addClient')
    const contactField = document.querySelector('.form__contact')
    const inputMiddleName = document.querySelector('#middle-name')
    const tblBtn = document.querySelectorAll('.tbl__button')
    const deleteClient = document.querySelector('.form__delete__contact')
    let fieldEntry = document.querySelector('.header__input')
    let itsTrue = false
    let timer
    let change

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
            default:
                cloneInput.type = 'text'
        }
    }
    /*Запись и перезапись*/
    async function postSubmit(id = '') {
        let check = false
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
            }
        }
        /*Валидация формы */
        /*Отправка на сервер */
            if (id) {
                const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
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
                const response = await fetch('http://localhost:3000/api/clients', {
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

    }


    /*Отрисовка таблицы */
    async function renderTable(arr) {
        $(".addClient").removeClass('closed')
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
                }
                else if (i === 'contacts' && i.length > 0) {
                    const contList = document.createElement('ul')
                    contList.classList.add('contact__list')
                    el[i].map(el => {
                        const contact = document.createElement('li')
                        const contact_value = document.createElement('span')
                        contact_value.classList.add('contact_value')
                        contact.classList.add('contact')
                        switch (el.type) {
                            case 'Телефон':
                                contact.innerHTML = `<i class = 'fa fa-phone'></i>`
                                contact.classList.add('contact__mobile')
                                break
                            case 'VK':
                                contact.classList.add('contact__vk')
                                contact.innerHTML = `<i class = 'fa fa-vk'></i>`
                                break
                            case 'Facebook':
                                contact.innerHTML = `<i class = 'fa fa-facebook'></i>`
                                contact.classList.add('contact__facebook')
                                break
                            case 'Email':
                                contact.innerHTML = `<i class = 'fa fa-envelope-o'></i>`
                                break
                            case 'Другое':
                                contact.innerHTML = `<i class = 'fa fa-user'></i>`
                        }
                        contact_value.innerHTML = `${el.type}:
                        <b>${el.value}</b>`
                        contact.append(contact_value)
                        contList.append(contact)
                        td.append(contList)
                    })
                }
                else td.innerHTML = el[i]
            }
            tbody.append(tr)
        })
        $(".tbl__change__btn").on('click', async function (e) {
            e.stopImmediatePropagation;
            var $this = $(this),
                modal = $($this).data("modal");
            const id = this.parentNode.parentNode.parentNode.firstElementChild.textContent
            const client = await getData(id)
            localStorage.setItem('id', JSON.stringify(this.parentNode.parentNode.parentNode.firstElementChild.textContent))
            $('.content__title')[0].innerHTML = `Изменить клиента &nbsp;<span>ID: ${client.id}</span>`
            $('#surname')[0].value = client.surname
            $('#name')[0].value = client.name
            $('#middle-name')[0].value = client.lastName || ''
            $('#middle-name')[0].value.length !== 0 ? addClassInputMiddleName.apply($('#middle-name')[0]) : null
            $('#btn__bifacial').addClass('delete__clients')
            $('.delete__clients').removeClass('form__close')
            $('.delete__clients')[0].innerHTML = 'Удалить клиента'
            $('.delete__clients').on('click', onDelete)

            client.contacts.map(el => {
                createContactField(el.type, el.value)

            })
            $(modal).parents(".overlay").addClass("open");
            setTimeout(function () {
                $(modal).addClass("open");
            }, 350);

        });

        $(".tbl__delete__btn").on('click', function (e) {
            e.stopImmediatePropagation;
            var $this = $(this),
                modal = $($this).data("modal");
            localStorage.setItem('id', JSON.stringify(this.parentNode.parentNode.parentNode.firstElementChild.textContent))
            $(modal).parents(".overlay").addClass("open");
            setTimeout(function () {
                $(modal).addClass("open");
            }, 350);

        });
    }

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
    async function onDelete() {
        const id = JSON.parse(localStorage.getItem('id'))
        fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'DELETE'
        })
        renderTable(await getData())
    }

    renderTable(await getData())


    inputMiddleName.addEventListener('blur', deleteClassMiddleName)
    inputMiddleName.addEventListener('focus', addClassInputMiddleName)

    btnAddContact.addEventListener('click', createContactField)

    modalForm.addEventListener('submit', function () {
        let id = JSON.parse(localStorage.getItem('id'))
        if (id) postSubmit(id)
        else postSubmit()
    })

    deleteClient.addEventListener('click', onDelete)

    fieldEntry.addEventListener('input', () => {
        clearTimeout(timer)
        timer = setTimeout(searchClient, 300)
    })

    for (let el of tblBtn) {
        el.addEventListener('click', sortTable)
    }

})