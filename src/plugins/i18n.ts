import { createI18n } from 'vue-i18n';

import { roRus } from '../langs/ro_rus.ts';
import { usEng } from '../langs/us_eng.ts';
import { zhHans } from '../langs/zh_hans.ts';

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof zhHans | typeof usEng | typeof roRus;

export const i18n = createI18n<
    [MessageSchema],
    'zh_hans' | 'us_eng' | 'ro_rus'
>({
    legacy: false,
    locale: 'zh_hans',
    fallbackLocale: 'zh_hans',
    warnHtmlMessage: false,
    messages: {
        zh_hans: zhHans,
        us_eng: usEng,
        ro_rus: roRus,
    },
});

export function Match(guess: string) {
    guess = guess.toLowerCase();
    if (
        guess.includes('ro') ||
        guess.includes('rus') ||
        guess.includes('ru-ru')
    )
        return 'ro_rus';
    if (
        guess.includes('zh-hans') ||
        guess.includes('zh-') ||
        guess.includes('taiwan')
    )
        return 'zh_hans';
    // ...
    else return 'us_eng';
}
