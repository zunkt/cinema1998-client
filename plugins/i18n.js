// i18n.js
// Thanks @lvaroqui for this
import en from 'vee-validate/dist/locale/en';
import vi from 'vee-validate/dist/locale/vi';
import { Validator } from 'vee-validate';
export default function ({ app }) {
	// Loading languages for Vee
	Validator.localize('vi', vi);
	Validator.localize('en', en);

	// Localizing the app when user refresh or access a localized link
	Validator.localize(app.i18n.loadedLanguages[0]);

	// beforeLanguageSwitch called viright before setting a new locale
	app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
		Validator.localize(newLocale);
	};
}
