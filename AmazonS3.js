'use strict';

var AmazonS3 = function(userSettings){

	var settings = {},
		self = this;

	var init = function(){

		initSettings();
	};

	var initSettings = function(){

		var defaultSettings = self.getDefaultSettings();

		$.extend(true, settings, defaultSettings, userSettings);
	};

	this.getDefaultSettings = function(){

		return {
			url: {
				bucket: '',
				site: 's3.amazonaws.com',
				protocol: 'http'
			},
			baseUploadDir: ''
		};
	};

	this.getBaseUrl = function(){

		var urlSettings = settings.url;

		return urlSettings.protocol + '://' + urlSettings.bucket + '.' + urlSettings.site;
	};

	this.getUploadUrl = function(){

		return self.getBaseUrl();
	};

	this.getSettings = function(setting){

		if(setting)
			return settings[setting];

		return settings;
	};

	this.upload = function(ajaxParams, serverParams){

		ajaxParams.url = self.getUploadUrl();

		ajaxParams.values = {
			key: settings.baseUploadDir + '/' + serverParams.fileName,
			file: serverParams.file
		};

		return $.upload(ajaxParams);
	};

	init();
};