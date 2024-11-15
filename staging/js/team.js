class TeamMember {
    constructor(fname, lname, role, img_src) {
        this.fname = fname;
        this.lname = lname;
        this.role = role;
        this.img_src = img_src;
    }
    getImgSRC() {
        return this.img_src === 'temp' ? './assets/temp/teamPhoto.png' : `./assets/images/teamphotos/${this.img_src}.png`;
    }
    getImgSRCSet() {
        return this.img_src === 'temp' ? '' : (`
            https://res.cloudinary.com/drrssdubw/image/upload/q_auto/${this.img_src}.jpg 300w,
            https://res.cloudinary.com/drrssdubw/image/upload/q_auto/${this.img_src}.jpg 600w,
            https://res.cloudinary.com/drrssdubw/image/upload/q_auto/${this.img_src}.jpg 1000w
            `)
    }
}

const teamPageManager = {
    teamMembers: [
        new TeamMember('Ellen', 'Hughes', 'CEO & CTO', 'ellen'),
        new TeamMember('Paul', 'Haley', 'Chief Engineer', 'paul'),
        new TeamMember('Mike', 'Hoffelder', 'Director of Autonomy', 'mike'),
        new TeamMember('Kevin', 'Mitchell', 'Director of Data Science & AI', 'kevin'),
        new TeamMember('Cathy', 'Dietz', 'Director of Computer Vision', 'cathy'),
        new TeamMember('Robin', 'Joyce', 'Data Science Manager', 'robin'),
        new TeamMember('Song', 'Xiang', 'Director of Technology Commercialization', 'song'),
        new TeamMember('Lisa', 'Squillante', 'Director of Capital Investment & Sales', 'lisa'),
        new TeamMember('David', 'Keefer', 'President & Director of Business Operations', 'david'),
        new TeamMember('Swathi', 'Parvathaneni', 'Information Systems Manager', 'swathi'),
        new TeamMember('Anrey', 'Peng', 'Software & AI Engineer', 'anrey'),
        new TeamMember('Aidan', 'Meyer', 'Software Engineer', 'aidan'),
    ],
}
teamPageManager.createMemberElement = (tm) => {
    const memberConEl = document.createElement('div');
    const imgConEl = document.createElement('div');
    const nameConEl = document.createElement('div');
    const titleConEl = document.createElement('div');
    const imgEl = document.createElement('img');

    memberConEl.classList.add('member-con');
    imgConEl.classList.add('team-img-con');
    nameConEl.classList.add('team-member-name-con');
    titleConEl.classList.add('team-member-title-con');

    imgEl.src = tm.getImgSRC();
    // imgEl.srcset = tm.getImgSRCSet();

    memberConEl.appendChild(imgConEl);
    memberConEl.appendChild(nameConEl);
    memberConEl.appendChild(titleConEl);
    imgConEl.appendChild(imgEl);
    imgConEl.appendChild(imgEl);

    nameConEl.innerHTML = `<h2>${tm.fname + " " + tm.lname}</h2>`;
    titleConEl.innerHTML = `<h3>${tm.role}</h3>`;

    return memberConEl;

}
teamPageManager.addMemberElementToPage = (el) => {
    const mainEl = document.getElementById('team-main');
    mainEl.appendChild(el);
}
teamPageManager.initTeamMemberElements = () => {
    teamPageManager.teamMembers.forEach((member) => {
        const newMemberEl = teamPageManager.createMemberElement(member);
        teamPageManager.addMemberElementToPage(newMemberEl); 
    })
}

document.addEventListener('DOMContentLoaded', () => teamPageManager.initTeamMemberElements());

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
    parallaxEffect(pittsburghEl, 0.17);
});