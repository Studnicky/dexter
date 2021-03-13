'use strict';

//  Top level app-config that is always the same throughout all environments
module.exports = {
	env: process.env.NODE_ENV || 'development',
	host: process.env.APP_HOST || 'localhost',
	port: process.env.APP_PORT || '::',
	proxy: process.env.PROXY || true,
	appDebug: process.env.DEBUG === 'true',
	debugPlatform: process.env.DEBUG_PLATFORM || null,
	name: process.env.npm_package_description || process.env.APP_NAME || 'No name',
	description: process.env.npm_package_description || null,
	license: process.env.npm_package_license || 'UNLICENSED',
	contributors: [
		{
			name: process.env.npm_package_contributors_0_name || 'Unknown',
			email: process.env.npm_package_contributors_0_email || 'Unknown@nowhere.com',
			url: process.env.npm_package_contributors_0_url || 'http://not.specified.com'
		}
	],
	version: process.env.npm_package_version || 'Unversioned'
};
