const PopUpToastContainerClass =
    'toast-initial fixed p-3 use-icon #COLOR# border opacity-95 shadow-xl hover:shadow-2xl rounded-lg mx-auto max-w-max left-0 right-0 inline-block z-100';
const PopUpToastInnerClass =
    'use-icon force-baseline inline-block px-2.5 mx-auto lini';

function useToastArea() {
    return document.getElementById('pa')!;
}

export function pushToast(
    str: string,
    ucolor = 'bg-emerald-400',
    later = 0,
    disappear = 3200,
) {
    let color = ucolor;
    setTimeout(() => {
        switch (color) {
            case 'normal':
                // do nothing on the color
                break;
            case 'warn':
                color = 'bg-yellow-400';
                break;
            case 'err':
                color = 'bg-rose-400';
                break;
            case 'blur':
                color = 'backdrop-blur-md';
                break;
            default:
                break;
        }

        const pa = useToastArea();
        let containerC = PopUpToastContainerClass.replace('#COLOR#', color);
        let nPopToast = document.createElement('div');
        let nPopToastText = document.createElement('p');

        nPopToastText.innerHTML = str;
        nPopToast.appendChild(nPopToastText);
        for (let ii of containerC.split(' ')) {
            nPopToast.classList.add(ii);
        }
        for (let ii of PopUpToastInnerClass.split(' ')) {
            nPopToastText.classList.add(ii);
        }

        pa.appendChild(nPopToast);

        setTimeout(() => {
            nPopToast.classList.replace('toast-initial', 'toast-leave');
        }, disappear);

        setTimeout(() => {
            pa.removeChild(nPopToast);
        }, 787 + disappear);
    }, later);
}
