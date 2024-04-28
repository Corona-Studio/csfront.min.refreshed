import { createI18n } from 'vue-i18n';
import { zhHans } from '../langs/zh_hans.ts';
import { usEng } from '../langs/us_eng.ts';
import { roRus } from '../langs/ro_rus.ts';

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
