"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const tabheaderItems = document.querySelector('.tabheader__items');
    const tabheaderItem = tabheaderItems.querySelectorAll('.tabheader__item');
    const tabcontent = document.querySelectorAll('.tabcontent');
    const loader = document.querySelector('.loader');
    // loader
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500);
    }, 1000);

    // tab
    function deleteTab() {
        tabcontent.forEach((item) => {
            item.style.display = 'none';

        })
        tabheaderItem.forEach((el) => {
            el.classList.remove('tabheader__item_active')
        })

    }
    function pushTab(i = 0) {
        tabcontent[i].style.display = 'block';
        tabheaderItem[i].classList.add('tabheader__item_active');
    }
    deleteTab();
    pushTab();

    tabheaderItems.addEventListener('click', (event) => {
        let contenet = event.target;
        if (contenet && contenet.classList.contains('tabheader__item')) {
            tabheaderItem.forEach((item, index) => {
                if (contenet == item) {
                    deleteTab();
                    pushTab(index);
                }
            })
        }
    })

    //clock

    const deadline = "2023-04-20"

    function timeOutClock(endTime) {
        let days, hours, minutes, seconds
        let timer = Date.parse(endTime) - Date.parse(new Date());
        if (timer <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        }
        else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24));
            hours = Math.floor(timer / (1000 * 60 * 60) % 24);
            minutes = Math.floor((timer / 1000 / 60) % 60);
            seconds = Math.floor((timer / 1000) % 60);
        }
        return { timer, days, hours, minutes, seconds }
    }

    function zoro(num) {
        if (num < 10 && num >= 0) {
            return `0${num}`
        }
        else {
            return num
        }
    }

    function timeStart(selector, endTime) {
        let timer = document.querySelector(selector),

            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds");

        let stopp = setInterval(endHTML, 1000);
        endHTML()
        function endHTML() {
            const t = timeOutClock(endTime);

            days.innerHTML = zoro(t.days)
            hours.innerHTML = zoro(t.hours)
            minutes.innerHTML = zoro(t.minutes)
            seconds.innerHTML = zoro(t.seconds)

            if (t.timer <= 0) {
                clearInterval(stopp);
            }
        }
    }
    timeStart('.timer', deadline);

    //MODAL

    let phone = document.querySelector('[data-modal]');
    let madal = document.querySelector('.modal');
    let removeMadal = document.querySelector('.modal__close');

    function badyOverflowHidden() {
        document.body.style.overflow = 'hidden'
    }
    function badyOverflowNone() {
        document.body.style.overflow = ''
    }
    phone.addEventListener('click', () => {
        madal.style.display = 'block'
        clearInterval(timeModal);
        badyOverflowHidden();
    })
    removeMadal.addEventListener('click', () => {
        madal.style.display = 'none'
        badyOverflowNone()

    })
  

    madal.addEventListener('click', (e) => {
        let target = e.target
        if (target == madal) {
            madal.style.display = 'none'
            badyOverflowNone()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && madal.style.display == 'block') {
            madal.style.display = 'none'
            badyOverflowNone()
        }
    })


    //class
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 11000
            this.chageToUZS()
        }

        chageToUZS() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')

            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach((classname) => element.classList.add(classname))
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
            </div>
          `

            this.parent.append(element)
        }
    }

    new MenuCard(
        'img/tabs/1.png',
        'usual',
        'Plan "Usual"',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        10,
        '.menu .container'
    ).render()

    new MenuCard(
        'img/tabs/2.jpg',
        'plan',
        'Plan “Premium”',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        20,
        '.menu .container',
        'menu__item'
    ).render()

    new MenuCard(
        'img/tabs/3.jpg',
        'vip',
        'Plan VIP',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        30,
        '.menu .container',
        'menu__item'
    ).render()
})

