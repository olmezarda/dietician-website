// INTEREST AREAS -> SHOW ALL BUTTON
function toggleList() {
    var list = document.querySelector('.interest-list');
    var button = document.querySelector('.show-everything-button');
    list.classList.toggle('expanded');
    if (list.classList.contains('expanded')) {
        button.textContent = 'GİZLE';
    } else {
        button.textContent = 'TÜMÜNÜ GÖSTER';
    }
}

// COMMENTS -> SHOW ALL BUTTON
function toggleComments() {
    const comments = document.querySelectorAll('.comments-box:nth-child(n+7)');
    const button = document.querySelector('.show-more-button');

    if (button.innerText === "TÜMÜNÜ GÖSTER") {
        comments.forEach(comment => {
            comment.style.display = 'flex';
            setTimeout(() => comment.classList.remove('hidden'), 10);
        });
        button.innerText = "GİZLE";
    } else {
        comments.forEach(comment => {
            comment.classList.add('hidden');
            setTimeout(() => comment.style.display = 'none', 500);
        });
        button.innerText = "TÜMÜNÜ GÖSTER";
    }
}

// SCROLL TO HOMEPAGE BUTTON
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollTopButton").style.display = "block";
    } else {
        document.getElementById("scrollTopButton").style.display = "none";
    }
}

function topFunction() {
    var scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 100);
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 20);
}

let lastScrollTop = 0;

// HEADER APPEARS WHEN SCROLLING DOWN AND HIDES WHEN SCROLLING UP
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header-set');
    const scrollTop = window.scrollY;

    if (scrollTop > 635) {
        header.classList.add('fixed');

        if (scrollTop > lastScrollTop) {
            header.classList.remove('hidden');
        } else {
            header.classList.add('hidden');
        }
    } else {
        header.classList.remove('fixed');
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// CHANGING BACKGROUND COLOR OF THE MIDDLE SECTION BUTTONS IN THE HEADER WHEN HOVERED OVER THEIR CORRESPONDING SECTIONS
window.addEventListener('scroll', function () {
    var sections = document.querySelectorAll('div[id]');
    sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        var id = section.getAttribute('id');
        if (rect.top <= 70 && rect.bottom >= 70) {
            var activeLink = document.querySelector('.middle-section a[href="#' + id + '"] button');
            if (activeLink) {
                document.querySelectorAll('.middle-section button').forEach(function (button) {
                    button.classList.remove('active');
                });
                activeLink.classList.add('active');
            }
        }
    });
});

// SETTINGS FOR THE ACCORDION MENU IN THE COMMENTS SECTION
function toggleComments() {
    const commentsBoxes = document.querySelectorAll('.comments-box');
    commentsBoxes.forEach((box, index) => {
        if (index >= 6) {
            box.style.display = box.style.display === 'none' || box.style.display === '' ? 'flex' : 'none';
        }
    });

    const button = document.querySelector('.show-more-button');
    button.textContent = button.textContent === 'TÜMÜNÜ GÖSTER' ? 'DAHA AZ GÖSTER' : 'TÜMÜNÜ GÖSTER';
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.parentElement.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                this.textContent = "+";
            } else {
                content.style.display = "block";
                this.textContent = "-";
            }
        });
    });
});

// SEARCH BUTTON FOR SERVICES
function searchTable() {
    var input, filter, accordion, items, headers, content, p, i, j, txtValue, matchFound;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    accordion = document.getElementById('accordion');
    items = accordion.getElementsByClassName('accordion-item');

    if (filter === "") {
        resetAccordion();
        return;
    }

    for (i = 0; i < items.length; i++) {
        headers = items[i].getElementsByClassName('accordion-header')[0];
        content = items[i].getElementsByClassName('accordion-content')[0];
        p = content.getElementsByTagName('p');
        matchFound = false;

        for (j = 0; j < p.length; j++) {
            txtValue = p[j].textContent || p[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                matchFound = true;
                p[j].style.backgroundColor = '#122e53';
                p[j].style.color = 'gray';
                break;
            } else {
                p[j].style.backgroundColor = '';
            }
        }

        if (matchFound) {
            items[i].style.display = '';
            headers.classList.add('active');
            headers.innerHTML = headers.innerHTML.replace('+', '-');
            content.style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// THIS SECTION CLEARS CUSTOMIZATIONS APPLIED AFTER PERFORMING A SEARCH
function resetAccordion() {
    var headers = document.querySelectorAll('.accordion-header');
    var contents = document.querySelectorAll('.accordion-content');
    var items = document.querySelectorAll('.accordion-item');
    var paragraphs = document.querySelectorAll('.accordion-content p');

    headers.forEach(header => {
        header.classList.remove('active');
        header.innerHTML = header.innerHTML.replace('-', '+');
    });

    contents.forEach(content => {
        content.style.display = 'none';
    });

    items.forEach(item => {
        item.style.display = '';
    });

    paragraphs.forEach(p => {
        p.style.color = '';
        p.style.backgroundColor = '';
    });
}

// SERVICES SECTION ACCORDION MENU IMPLEMENTATION
function toggleAccordion(element) {
    var content = element.nextElementSibling;
    var isActive = element.classList.contains('active');
    var headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.classList.remove('active');
        header.innerHTML = header.innerHTML.replace('-', '+');
    });

    if (isActive) {
        element.classList.remove('active');
        content.style.display = 'none';
    } else {
        element.classList.add('active');
        element.innerHTML = element.innerHTML.replace('+', '-');
        content.style.display = 'block';
    }
}

// LEAFLET MAP CONFIGURATION AND SETUP
var map = L.map('map').setView([39.92077, 32.85411], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>'
}).addTo(map);

var marker = L.marker([39.92077, 32.85411]).addTo(map);

marker.bindTooltip("Klinik Adı").openTooltip();