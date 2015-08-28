// Karma configuration
// Generated on Thu Oct 30 2014 09:41:02 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
    'use strict';

  var baseConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'], //jasmine-ajax must come before jasmine, otherwise it will try to load before jasmine.


    // list of files / patterns to load in the browser
    files: [
		//Helpers not tested.
        'JS/Main/Globals.js',
        'JS/Main/Capture/FormMappingBuilder.js',
        'JS/Main/Capture/FormManager.js',
        // Utils section
        'JS/Shared/Utils/captureAppsBrowserify.js',
        'JS/Shared/Utils/UtilsIframe.js',
        'JS/Shared/Utils/String.js',
        'JS/Shared/Utils/Ajax.js',
        'JS/Shared/Utils/Random.js',
        'JS/Shared/Utils/Array.js',

        /*** Tested files. ****/
        // Main
        'JS/Main/AppsCore.js',
        'JS/Main/CaptureCore.js',
        // Utils
        'JS/Shared/Classes/QueueManager.js',
        //'JS/Shared/Classes/MessageManager.js',
        'JS/Shared/Utils/Promocode.js',
        'JS/Main/Apps/Agents/CriteriaFilters.js',
        'JS/Main/Apps/Agents/AgentManager.js',
        // Shared.
        'JS/Shared/Utils/TimerManager.js',

        // App block
        'JS/Main/Apps/AppMarkupBuilder.js',
        'JS/Main/Apps/AppPositioner.js',
        'JS/Main/Apps/DragManager.js',

        // App manager.
        'JS/Main/AppState/AppsManager.js',
        'JS/Main/AppState/OnEvent.js',
        'JS/Main/AppState/Status.js',
        'JS/Main/AppState/AppsManagerControls.js',
        'JS/Main/AppState/RegisterApp.js',

        // PopEvents files.
        'JS/Main/PopEvents/PopEvents.js',
        'JS/Main/PopEvents/Exit.js',
        'JS/Main/PopEvents/ExitIntent.js',
        'JS/Main/PopEvents/BackButton.js',
        'JS/Main/PopEvents/IframeBackButton.js',
        'JS/Main/PopEvents/PushStateBackButton.js',
        'JS/Main/PopEvents/Inactivity.js',
        'JS/Main/PopEvents/Load.js',

        //Core functionality classes
        'JS/Main/CaptureCore.js',
        'JS/Main/AppsCore.js',

        //Capture base block
        'JS/Main/Capture/FormIdentifier.js',
        'JS/Main/Capture/CapturedFormMapping.js',
        'JS/Main/Capture/CaptureApi.js',
        'JS/Main/Capture/FormChangeStatus.js',
        'JS/Main/Capture/CaptureData.js',
        'JS/Main/Capture/FormMapping.js',

        'Test/**'
    ],

      // list of files to exclude
    exclude: [
        'Test/GenieCustomJS/**',
        'Test/Shared/Utils/TestUtilsGlobal.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'JS/Iframe/**': 'coverage',
        'JS/Main/**': 'coverage',
        'JS/Shared/**': 'coverage',
        'Test/Iframe/Storage/*Test.js': 'browserify',
        'Test/Iframe/Events/*Test.js': 'browserify',
        'Test/Iframe/Assist/*Test.js': 'browserify',
        'Test/Iframe/Chat/*Test.js': 'browserify',
        'Test/Iframe/Promote/*Test.js': 'browserify',
        'Test/Iframe/Panel/*Test.js': 'browserify',
        'Test/Iframe/Shared/*Test.js': 'browserify',
        'Test/Components/**/*Test.js': 'browserify',
        'JS/Shared/Utils/captureAppsBrowserify.js': 'browserify',
        'JS/Shared/Utils/*.js': 'browserify',
        'Test/Main/FormIdentificationCoreTest.js': 'browserify',
        'Test/Main/AppsInitialiserTest.js': 'browserify',
        'Test/Shared/Utils/StorageTest.js': 'browserify',
        'Test/Shared/Utils/ArrayTest.js': 'browserify',
        'Test/Shared/Utils/Dom/*.js': 'browserify',
        'Test/Shared/Utils/CaptureTest.js': 'browserify',
        'Test/Shared/Utils/FunctionsTest.js': 'browserify',
        'Test/Shared/Utils/TabsManagerTest.js': 'browserify',
        'Test/Shared/Utils/PageMediatorTest.js': 'browserify',
        'Test/Shared/Utils/CaptureAppsMediatorTest.js': 'browserify',
        'Test/Shared/Utils/ComplianceMediatorTest.js': 'browserify',
        'Test/Shared/Utils/ObjectTest.js': 'browserify',
        'Test/Shared/Utils/TagTransformerTest.js': 'browserify',
        'Test/Shared/Classes/SessionTest.js': 'browserify',
        'Test/Shared/Classes/ApiManagerTest.js': 'browserify',
        'Test/Shared/Classes/BrowserTest.js': 'browserify',
        'Test/Shared/Classes/MessageManagerTest.js': 'browserify',
        'Test/Shared/Classes/IframeStorageProxyTest.js': 'browserify',
        'Test/Shared/Classes/LocalStorageProxyTest.js': 'browserify',
        'Test/Shared/Classes/ReportingTest.js': 'browserify',
        'Test/Main/CaptureAppsStartupTest.js': 'browserify',
        'Test/Main/UtilsGlobalTest.js': 'browserify',
        'Test/Main/Apps/AppFactoryTest.js': 'browserify',
        'Test/Main/Apps/Assist/SearchTerms/*Test.js': 'browserify',
        'Test/Main/Apps/AppTest.js': 'browserify',
        'Test/Main/Apps/AssistTest.js': 'browserify',
        'Test/Main/Apps/ChatTest.js': 'browserify',
        'Test/Main/Apps/PromoteTest.js': 'browserify',
        'Test/Main/Apps/PanelTest.js': 'browserify',
        'Test/Main/Apps/Promote/*.js': 'browserify',
        'Test/Main/Capture/Plugins/**': 'browserify'
    },

    browserify: {
      debug: true,
      plugin: ['proxyquire-universal']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    coverageReporter: {
        type: 'text',
        dir: 'coverage/',
        includeAllSources: true
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  };

  function excludeBrowserified (baseConfig) {
    var key,
        liveString;

      for (key in baseConfig.preprocessors) {
        if (key.indexOf('Test') === 0) {
            liveString = key.replace(/^Test/, 'JS').replace(/Test\.js$/, '.js');
            //baseConfig.exclude.push(key);
            baseConfig.exclude.push(liveString);
        }
      }
    }
    excludeBrowserified(baseConfig);

  config.set(baseConfig);
};
