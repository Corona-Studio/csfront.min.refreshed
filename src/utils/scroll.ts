export function doScroll(id: string, shine = true, precise = false) {
    if (id != '.PAGETOP') {
        const to = document.getElementById(id.replace('#', ''))!;
        window.scrollTo({
            top: to.offsetTop - (precise ? -1 : 50),
            behavior: 'smooth',
        });

        if (shine) {
            to.classList.add('transition');
            setTimeout(() => {
                to.classList.add('shine');
            }, 810);
            setTimeout(() => {
                to.classList.remove('shine');
            }, 1145);
        }

        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
