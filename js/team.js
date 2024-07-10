(function env() {
    const teamMembers = [
        {
            name: "test",
            title: "this card is created dynamically",
            src: "./assets/images/temp/aidan.jpg"
        }
    ] 

    const populateTeamMembers = (() => {
        const mainEl = document.getElementById('team-main')
        teamMembers.forEach((member) => {
            // Create child elements
            const memberConEl = document.createElement('div');
            const imgConEl = document.createElement('div');
            const nameConEl = document.createElement('div');
            const titleConEl = document.createElement('div');
            const imgEl = document.createElement('img');

            // Assign classes
            memberConEl.classList.add('member-con');
            imgConEl.classList.add('team-img-con');
            nameConEl.classList.add('team-member-name-con');
            titleConEl.classList.add('team-member-title-con');

            // Set image attributes
            // imgEl.width = "100%";
            imgEl.src = member.src;

            // Append child elements
            memberConEl.appendChild(imgConEl);
            memberConEl.appendChild(nameConEl);
            memberConEl.appendChild(titleConEl);
            imgConEl.appendChild(imgEl);
            imgConEl.appendChild(imgEl);

            // Set name and title
            nameConEl.innerHTML = `<h2>${member.name}</h2>`;
            titleConEl.innerHTML = `<h3>${member.title}</h3>`;
            
            // Append new team member to main element.
            mainEl.appendChild(memberConEl);
        });

    })//()
    const parallaxEffect = (element, speedFactor = 0.5) => {        
        if (!element) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function onScroll() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        function updateParallax() {
            element.style.transform = 'translateY(' + (lastScrollY * speedFactor) + 'px)';
            ticking = false;
        }

        window.addEventListener('scroll', onScroll);
    }
    document.addEventListener('DOMContentLoaded', () => {
        const pittsburghEl = document.querySelector('#team-hero-background');
        parallaxEffect(pittsburghEl, 0.15);
    });

})()
