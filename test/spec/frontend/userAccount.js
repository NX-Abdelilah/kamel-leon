/* File: userAccount.js
 *
 * Copyright (c) 2014
 * Centre National d’Enseignement à Distance (Cned), Boulevard Nicephore Niepce, 86360 CHASSENEUIL-DU-POITOU, France
 * (direction-innovation@cned.fr)
 *
 * GNU Affero General Public License (AGPL) version 3.0 or later version
 *
 * This file is part of a program which is free software: you can
 * redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

describe('Controller:UserAccountCtrl', function() {
	var $scope, controller;
	var accounts = {
		user: {
			_id: '532328858785a8e31b786238'
		},
		dropbox: {
			accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
			country: 'MA',
			display_name: 'youbi anas',
			emails: 'anasyoubi@gmail.com',
			referral_link: 'https://db.tt/wW61wr2c',
			uid: '264998156'
		},
		local: {
			email: 'anasyoubi@gmail.com',
			nom: 'youbi',
			password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
			prenom: 'anas',
			role: 'admin',
			restoreSecret: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiJ0dHdocjUyOSJ9.0gZcerw038LRGDo3p-XkbMJwUt_JoX_yk2Bgc0NU4Vs",
			secretTime: "201431340",
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec",
			tokenTime: 1397469765520
		}
	};

	var account = {
		user: {
			_id: '52c588a861485ed41c210001'
		},
		local: {
			email: 'mail@email.com',
			nom: 'nom3',
			prenom: 'prenom3',
			password: '$2a$08$.tZ6f5O4P4Cfs1smRXzTdOXht2Fld6RxAsxZsuoyscenp3tI9G6JO',
			role: 'user'

		}
	};

	beforeEach(module('cnedApp'));

	beforeEach(inject(function($controller, $rootScope, $httpBackend, configuration) {
		$scope = $rootScope.$new();
		controller = $controller('UserAccountCtrl', {
			$scope: $scope
		});

		$scope.compte = accounts.local;
		localStorage.setItem('compteId', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec');
		$scope.testVar = {
			loged: true,
			redirected: 'ok',
			path: '/inscriptionContinue',
			dropboxWarning: false
		};
		$scope.objet = {
			user: {
				_id: '532328858785a8e31b786238'
			}
		};

		$scope.userAccount = account;
		$httpBackend.whenGET(configuration.URL_REQUEST + '/profile?id=' + $scope.compte.token).respond($scope.testVar);
		$httpBackend.whenPOST(configuration.URL_REQUEST + '/modifierInfosCompte').respond(accounts);
		$httpBackend.whenPOST(configuration.URL_REQUEST + '/checkPassword').respond('true');
		$httpBackend.whenPOST(configuration.URL_REQUEST + '/modifierPassword').respond('password');

	}));


	it('UserAccountCtrl:initial should set initial function', inject(function() {
		expect($scope.initial).toBeDefined();
	}));

	it('UserAccountCtrl:initial should set initial function', inject(function($httpBackend, $rootScope) {
		$scope.initial();
		$httpBackend.flush();
		expect($rootScope.dropboxWarning).toBeFalsy();
		expect($rootScope.loged).toBeTruthy();


	}));

	it('UserAccountCtrl:modifierCompte should set modifierCompte function', function() {
		expect($scope.modifierCompte).toBeDefined();
	});

	it('UserAccountCtrl:modifierCompte should set modifierCompte function', inject(function($httpBackend) {
		$scope.modifierCompte();
		$httpBackend.flush();
		expect($scope.monObjet).toEqual(accounts);
	}));

	it('UserAccountCtrl:modifierPassword should set modifierPassword function', inject(function($httpBackend) {

		$scope.compte.oldPassword = accounts.local.password;	
		$scope.compte.newPassword = 'password';
		$scope.compte.reNewPassword = 'password';
		$scope.testVar = 'true';
		$scope.modifierPassword();
		expect($scope.testVar).toEqual('true');
		expect($scope.verifyPassword($scope.compte.newPassword)).toBeTruthy();
		expect($scope.verifyPassword($scope.compte.reNewPassword)).toBeTruthy();
		expect($scope.compte.newPassword).toEqual($scope.compte.reNewPassword);
		$httpBackend.flush();
		expect($scope.compte.oldPassword).toEqual('');
		expect($scope.compte.newPassword).toEqual('');
		expect($scope.compte.reNewPassword).toEqual('');

	}));

	it('UserAccountCtrl:verifyPassword should set verifyPassword function', inject(function() {
		expect($scope.verifyPassword).toBeDefined();
		expect($scope.verifyPassword('password')).toBeTruthy();
		expect($scope.verifyPassword('001')).toBeFalsy();
	}));


});