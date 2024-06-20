const testimonials = [
    {
        quote: '"Such technology would have a <strong>tremendous impact</strong> on clinical care and future research of acute respiratory illness. <strong>It would support pharmaceutical companies</strong> and clinical investigators in clinical trials in objective and <strong>rapid</strong> but <strong>accurate decision making</strong> around trial enrollment and therapy decisions."',
        quotedBy: '- Top German Pharmaceutical Company'
    },
    {
        quote: '"Needless to say, there is <strong>huge market potential</strong>."',
        quotedBy: '- CEO, of Venture Capitalist Specializing in Medical Software'
    },
    {
        quote: '"There is an <strong>urgent need</strong> to improve the quantitative assessment of radiographic severity in acute respiratory illness. The research ... has great clinical and research potential. Pulmonology has lagged behind other disciplines... therefore [VeyTel’s technology] represents a <strong>CRITICAL UNMET NEED</strong>."',
        quotedBy: '- Major Midwestern Medical Center'
    },
    {
        quote: '"Derma-AI... would <strong>promote early detection</strong>... and have the greatest chance to <strong>reduce the burden of later disease</strong> - both in terms of morbidity and mortality."',
        quotedBy: '- Largest Pitsburgh Cancer Center'
    },


];

const quoteConEl = document.querySelector('.quote-con');
const quoteEl = quoteConEl.querySelector('.quote');
const quotedByEl = quoteConEl.querySelector('.quoted-by');
const circleNextButtonEl = document.querySelector('.circle-next-arrow');
const circleBackButtonEl = document.querySelector('.circle-prev-arrow');

let i = 0;
let numer_of_testimonials = testimonials.length;

quoteEl.innerHTML = testimonials[i].quote;
quotedByEl.innerHTML = testimonials[i].quotedBy;

circleNextButtonEl.addEventListener('click', ()=> {
    if (i < numer_of_testimonials - 1)
        i++;
    else
        i = 0;
    quoteEl.innerHTML = testimonials[i].quote;
    quotedByEl.innerHTML = testimonials[i].quotedBy;

})

circleBackButtonEl.addEventListener('click', ()=> {
    if (i > 0)
        i--;
    else
        i = numer_of_testimonials-1;
    quoteEl.innerHTML = testimonials[i].quote;
    quotedByEl.innerHTML = testimonials[i].quotedBy;

})

