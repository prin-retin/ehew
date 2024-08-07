
(function() {
//===== Preloader

	window.onload = function () {
		window.setTimeout(fadeout, 500);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;
        var logo = document.querySelector(".navbar-brand img");

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
            logo.src = 'assets/img/logo/logo-2.svg'
        } else {
            header_navbar.classList.remove("sticky");
            logo.src = 'assets/img/logo/logo.svg'
        }



        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	window.document.addEventListener('scroll', onScroll);


    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show')
        })
    );
    navbarToggler.addEventListener('click', function() {
        navbarToggler.classList.toggle("active");
    }) 


	//======== tiny slider
	var slider = new tns({
		container: '.testimonial-active',
		slideBy: 'page',
		autoplay: false,
		mouseDrag: true,
        gutter: 0,
        items: 1,
		nav: true,
        controls: true,
        controlsText: [
            '<span class="prev"><i class="lni lni-chevron-left"></i></span>',
            '<span class="next"><i class="lni lni-chevron-right"></i></span>',
        ],
        responsive: {
            0: {
                controls: false,
            },

            768: {
                controls: true,
            }

        }
    });

    //========= glightbox
    const myGallery = GLightbox({
        'href': 'https://www.youtube.com/watch?v=g0zKQz46QY4',
        'type': 'video',
        'source': 'youtube', //vimeo, youtube or local
        'width': 900,
        'autoplayVideos': true,
    });

	// WOW active
    new WOW().init();

    
    //====== counter up 
    var cu = new counterUp({
        start: 0,
        duration: 2000,
        intvalues: true,
        interval: 100,
        append: " ",
    });
    cu.start();

    // ====== date countdown
    const end = new Date("May 03, 2025 00:00:00").getTime();
    //const end = new Date("November 09, 2020 00:00:00").getTime();
    const dayEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    const x = setInterval(function () {
        let now = new Date().getTime();
        const difference = end - now;
        
        if (difference < 0) {
        clearInterval(x);
        document.getElementById("done").innerHTML = "We're married! 🎉";
        return;
        }
        
        dayEl.innerText = Math.floor(difference / days);
        hoursEl.innerText = Math.floor( (difference % days) / hours );
        minutesEl.innerText = Math.floor( (difference % hours) / minutes );
        secondsEl.innerText = Math.floor( (difference % minutes) / seconds );  
    }, seconds);


    // ====== scroll top js
    function scrollTo(element, to = 0, duration= 1000) {

        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    document.querySelector('.scroll-top').onclick = function () {
        scrollTo(document.documentElement); 
    }


})();