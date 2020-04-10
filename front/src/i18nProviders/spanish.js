import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from 'ra-language-spanish';
const _ = require('lodash');

const additionalSpanishMessages = {
  ra: {
    page: {
      dashboard: "Tablero de Control",
      empty: "No hay %{name} aún.",
      invite: "¿Deseas crear uno?"
    },
    auth: {
      user_menu: "Menú",
      auth_check_error: "Inicie sesión para continuar"
    },
    action: {
      export: "Exportar",
      bulk_actions: "%{smart_count} seleccionados",
      clear_input_value: "Limpiar"
    },
    navigation: {
      page_rows_per_page: "Filas por página:"
    }
  },
  "Invalid login": "Credenciales no válidas"
}

const messages = {
  'es': _.merge(spanishMessages, additionalSpanishMessages)
};

const spanishI18nProvider = polyglotI18nProvider(locale => messages[locale], 'es');

export {
  spanishI18nProvider
}
