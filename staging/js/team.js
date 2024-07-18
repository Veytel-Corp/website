class TeamMember {
    constructor(fname, lname, role, img_src) {
        this.fname = fname;
        this.lname = lname;
        this.role = role;
        this.img_src = img_src;
    }
    getImgSRC() {
        return this.img_src === 'temp' ? './assets/temp/teamPhoto.png' : "https://res.cloudinary.com/drrssdubw/image/upload/q_auto/${this.img_src}.jpg";
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
        new TeamMember('Ellen', 'Hughes', 'CEO & CTO', 'temp'),
        new TeamMember('Paul', 'Haley', 'Chief Engineer', 'temp'),
        new TeamMember('Mike', 'Hoffelder', 'Director of Autonomy', 'temp'),
        new TeamMember('Kevin', 'Mitchell', 'Director of Data Science & AI', 'temp'),
        new TeamMember('Cathy', 'Dietz', 'Director of Computer Vision', 'temp'),
        new TeamMember('Robin', 'Joyce', 'Data Science Manager', 'temp'),
        new TeamMember('Song', 'Xiang', 'Director of Marketing & Strategy', 'temp'),
        new TeamMember('Lisa', 'Squillante', 'Director of Capital Investment & Sales', 'temp'),
        new TeamMember('David', 'Keefer', 'President & Director of Business Operations', 'temp'),
        new TeamMember('Swathi', 'Parvathaneni', 'Information Systems Manager', 'v1721242459/SwathiParvathaneni_i188h3'),
        new TeamMember('Anrey', 'Peng', 'Software & AI Engineer', 'v1721239415/AnreyPeng_gtvkga'),
        new TeamMember('Aidan', 'Meyer', 'Software Engineer Intern', 'temp'),
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
    imgEl.srcset = tm.getImgSRCSet();

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