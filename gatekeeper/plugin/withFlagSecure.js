const { withAndroidManifest } = require('@expo/config-plugins');

// @ts-ignore
const withFlagSecure = (config) => {
    // @ts-ignore
    return withAndroidManifest(config, (config) => {
        const androidManifest = config.modResults;

        androidManifest.application[0]['$']['android:allowBackup'] = 'false';
        androidManifest.application[0]['$']['android:hardwareAccelerated'] = 'true';
        androidManifest.application[0]['$']['android:secure'] = 'true';

        console.log("secure plugin executed");
        return config;
    });
};

module.exports = withFlagSecure;
