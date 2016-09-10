export class LocaleMapping {
    static schema = {
        name: "LocaleMapping",
        properties: {
            locale: "string",
            option: "string"
        }
    };
}

export class Locale {
    static schema = {
        name: 'Locale',
        properties: {
            selectedLocale: "string",
            availableValues: {"type": "list", "objectType": "LocaleMapping"}
        }
    };
}