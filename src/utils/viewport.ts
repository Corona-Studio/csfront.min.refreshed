let timer = false;
let timeout: NodeJS.Timeout;

export function resetBaseTimer() {
    clearTimeout(timeout);
}

export function baseInvokeHeightFix(x = true) {
    if (timer && x) return;
    else {
        timer = true;
        document.getElementById('PMC')!.style.height =
            document.getElementById('aspan')!.offsetTop + 'px';
        console.log('Invoked: reform of window size (root)');
        timeout = setTimeout(() => {
            timer = false;
            resetBaseTimer();
        }, 890);
    }
}
