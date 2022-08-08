import github from './assets/github.svg';
import email from './assets/email.svg';
import linkedin from './assets/linkedin.svg';
import portfolio from './assets/portfolio.svg';

export const contactObj = {
    links: [
        {
            label: 'Github',
            id: 'github',
            link: 'https://github.com/supahkenneh',
            icon: github
        },
        {
            label: 'LinkedIn',
            id: 'linkedin',
            link: 'https://www.linkedin.com/in/chung-kenny/',
            icon: linkedin
        },
        {
            label: 'Portfolio',
            id: 'portfolio',
            link: 'https://kennychung.dev',
            icon: portfolio
        },
        {
            label: 'Email',
            id: 'email',
            link: 'mailto:chunghlken@gmail.com',
            icon: email
        }
    ]
}