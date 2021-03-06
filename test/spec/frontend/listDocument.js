/* File: listDocument.js
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
/* global $:false, spyOnEvent */

describe('Controller:listDocumentCtrl', function() {
	var $scope, controller;

	var doc = {
		titre: 'Document 01'
	};

	beforeEach(module('cnedApp'));

	beforeEach(inject(function($controller, $rootScope, $httpBackend, configuration) {
		$scope = $rootScope.$new();
		controller = $controller('listDocumentCtrl', {
			$scope: $scope
		});
		$scope.testEnv = true;

		$scope.mail = {
			to: 'test@test.com',
			content: 'Je viens de partager avec vous le lien suivant : dropbox.com',
			encoded: '<div>Je viens de partager avec vous le lien suivant : dropbox.com</div>'
		};

		$scope.sharedDoc = 'test.pdf';

		$scope.docApartager = {
			lienApercu: 'dropbox.com'
		};
		$rootScope.myUser = {
			dropbox: {
				accessToken: 'K79U_9sinzkAAAAAAAAAAXOOOO-ShukKKOSFG6tVhO645bUwaYER2g7bN3eHuQsS'
			}
		};

		$rootScope.currentUser = {
			__v: 0,
			_id: '5329acd20c5ebdb429b2ec66',
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
		localStorage.setItem('compteId', $rootScope.currentUser.local.token);

		var tags = [{
			_id: '52c6cde4f6f46c5a5a000004',
			libelle: 'Exercice'
		}, {
			_id: '52c588a861485ed41c000002',
			libelle: 'Cours'
		}];
		$scope.destination = 'test@test.com';

		$scope.destinataire = 'test@test.com';

		$scope.dataRecu = {
			loged: true,
			dropboxWarning: true,
			user: {
				__v: 0,
				_id: '5329acd20c5ebdb429b2ec66',
				dropbox: {
					accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
					country: 'MA',
					'display_name': 'youbi anas',
					emails: 'anasyoubi@gmail.com',
					'referral_link': 'https://db.tt/wW61wr2c',
					uid: '264998156'
				},
				local: {
					email: 'anasyoubi@gmail.com',
					nom: 'youbi',
					password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
					prenom: 'anas',
					role: 'admin'
				}
			},
			__v: 0,
			_id: '5329acd20c5ebdb429b2ec66',
			dropbox: {
				accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
				country: 'MA',
				'display_name': 'youbi anas',
				emails: 'anasyoubi@gmail.com',
				'referral_link': 'https://db.tt/wW61wr2c',
				uid: '264998156'
			},
			local: {
				email: 'anasyoubi@gmail.com',
				nom: 'youbi',
				password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
				prenom: 'anas',
				role: 'admin'
			}
		};

		$scope.dropboxHtmlSearch = [{
			'revision': 919,
			'rev': '39721729c92',
			'thumb_exists': false,
			'bytes': 121273,
			'modified': 'Tue, 01 Apr 2014 08:47:13 +0000',
			'client_mtime': 'Tue, 01 Apr 2014 08:47:13 +0000',
			'path': '/manifestPresent.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '118.4 KB'
		}, {
			'revision': 924,
			'rev': '39c21729c92',
			'thumb_exists': false,
			'bytes': 17344,
			'modified': 'Tue, 01 Apr 2014 08:52:08 +0000',
			'client_mtime': 'Tue, 01 Apr 2014 08:52:09 +0000',
			'path': '/test.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '16.9 KB'
		}];
		$scope.uniqueResult = {
			'size': '15 bytes',
			'rev': '1f0a503351f',
			'thumb_exists': false,
			'bytes': 15,
			'modified': 'Wed, 10 Aug 2011 18:21:29 +0000',
			'path': '/test1.txt',
			'is_dir': false,
			'icon': 'page_white_text',
			'root': 'dropbox',
			'mime_type': 'text/plain',
			'revision': 496342
		};

		var data = {
			url: 'dl.dropboxusercontent.com/s/1a5ul0g820on65b/test.html#/listDocument'
		};
		$scope.apercuName = 'doc02.html';
		var entirePage = '<html class="no-js" lang="fr" manifest=""> <!--<![endif]--><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">';
		localStorage.setItem('compte', $scope.dataRecu.dropbox.accessToken);
		$httpBackend.whenPOST('https://api.dropbox.com/1/search/?access_token=' + $scope.dataRecu.dropbox.accessToken + '&query=' + doc.titre + '.html&root=' + configuration.DROPBOX_TYPE).respond({});

		$scope.indexPage = '<html class="no-js" lang="fr" manifest=""> <!--<![endif]--><head></head><body></body></html>';
		$scope.appcache = 'CACHE MANIFEST # 2010-06-18:v2 # Explicitly cached \'master entries\'. CACHE: https://dl.dropboxusercontent.com/s/ee44iev4pgw0avb/test.html # Resources that require the user to be online. NETWORK: * ';

		$httpBackend.whenPOST(configuration.URL_REQUEST + '/sendMail').respond($scope.mail);
		$httpBackend.whenGET(configuration.URL_REQUEST + '/profile?id=' + $rootScope.currentUser.local.token).respond($scope.dataRecu);
		$httpBackend.whenPOST('https://api.dropbox.com/1/search/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&query=.html&root=sandbox').respond($scope.dropboxHtmlSearch);
		$httpBackend.whenGET('https://api-content.dropbox.com/1/files/sandbox/' + configuration.CATALOGUE_NAME + '?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.indexPage);
		$httpBackend.whenPUT('https://api-content.dropbox.com/1/files_put/sandbox/' + configuration.CATALOGUE_NAME + '?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.dropboxHtmlSearch);
		$httpBackend.whenGET('https://api-content.dropbox.com/1/files/sandbox/listDocument.appcache?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.appcache);
		$httpBackend.whenPUT('https://api-content.dropbox.com/1/files_put/sandbox/listDocument.appcache?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.dropboxHtmlSearch);
		$httpBackend.whenPOST('https://api.dropbox.com/1/fileops/delete/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&path=abc&root=sandbox').respond($scope.dataRecu);
		$httpBackend.whenPOST('https://api.dropbox.com/1/fileops/copy?root=sandbox&from_path=abc&to_path=/abc2.html&access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond($scope.uniqueResult);
		$httpBackend.whenPOST('https://api.dropbox.com/1/shares/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&path=abc2.html&root=sandbox&short_url=false').respond(data);
		$httpBackend.whenPOST('https://api.dropbox.com/1/fileops/delete/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&path=/abc&root=sandbox').respond(data);
		$httpBackend.whenGET(configuration.URL_REQUEST + '/readTags?').respond(tags);
		$httpBackend.whenGET('https://localhost:3000/readTags?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec').respond(tags);
		$httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherTagsParProfil').respond(tags);
		$httpBackend.whenPOST('https://api.dropbox.com/1/fileops/copy?root=sandbox&from_path=abc&to_path=/abc2.appcache&access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond(tags);
		$httpBackend.whenPOST('https://api.dropbox.com/1/shares/?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn&path=abc2.appcache&root=sandbox&short_url=false').respond(data);
		$httpBackend.whenGET('https://api-content.dropbox.com/1/files/sandbox/abc2.html?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond(entirePage);
		$httpBackend.whenPUT('https://api-content.dropbox.com/1/files_put/sandbox/abc2.html?access_token=PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn').respond(data);

		$httpBackend.whenGET('https://api-content.dropbox.com/1/files/' + configuration.DROPBOX_TYPE + '/' + $scope.apercuName + '?access_token=' + $rootScope.currentUser.dropbox.accessToken).respond('<htlm manifest=""><head><script> var profilId = null; var blocks = {"children":[{"id":461.5687490440905,"originalSource":"data:image/png;base64,","source":{},"text":"","level":0,"children":[{"id":"139482262782797","text":"Un titre","source":{},"children":[],"originalSource":"data:image/png;base64,jhdsghfsdhhtd","tag":"52d0598c563380592bc1d704"},{"id":"1394822627845718","text":"Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte Un example de texte ","source":{},"children":[],"originalSource":"data:image/png;base64,dgshgdhgsdggd","tag":"52c588a861485ed41c000001"}]}]}; var listDocument= []; </script></head><body></body></html>');

	}));


	it('listDocumentCtrl: initListDocument function', inject(function($httpBackend, $rootScope) {
		$scope.testEnv = true;
		$scope.initListDocument();
		$httpBackend.flush();
		expect($rootScope.loged).toEqual(true);
		expect($scope.flagListDocument).toEqual(true);
	}));


	it('listDocumentCtrl:open function', function() {
		expect($scope.open).toBeDefined();
		$scope.deleteLink = '/abc.html';
		$scope.deleteLienDirect = 'LienApercu';
		$scope.open();
		expect($scope.flagDeleteOpened).toEqual(true);
	});

	it('listDocumentCtrl:suprimeDocument function', inject(function($httpBackend) {
		expect($scope.suprimeDocument).toBeDefined();
		$scope.deleteLink = 'abc';
		$scope.listDocument = [{
			'revision': 1795,
			'rev': '70321729c92',
			'thumb_exists': false,
			'bytes': 89109,
			'modified': 'Tue, 08 Apr 2014 11:13:49 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 10:47:30 +0000',
			'path': '/goool.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'app_folder',
			'mime_type': 'text/html',
			'size': '87 KB',
			'lienApercu': 'https://dl.dropboxusercontent.com/s/61hyatcaze1aes4/goool.html#/apercu'
		}, {
			'revision': 1810,
			'rev': '71221729c92',
			'thumb_exists': false,
			'bytes': 89109,
			'modified': 'Tue, 08 Apr 2014 11:21:27 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:10:58 +0000',
			'path': '/plz.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'app_folder',
			'mime_type': 'text/html',
			'size': '87 KB',
			'lienApercu': 'https://dl.dropboxusercontent.com/s/pcy8mrms3ki7eie/plz.html#/apercu'
		}, {
			'revision': 1771,
			'rev': '6eb21729c92',
			'thumb_exists': false,
			'bytes': 16470,
			'modified': 'Mon, 07 Apr 2014 23:20:42 +0000',
			'client_mtime': 'Mon, 07 Apr 2014 23:20:42 +0000',
			'path': '/test.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '16.1 KB'
		}, {
			'revision': 1553,
			'rev': '61121729c92',
			'thumb_exists': false,
			'bytes': 89112,
			'modified': 'Thu, 03 Apr 2014 11:33:55 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:33:55 +0000',
			'path': '/bouchta.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1768,
			'rev': '6e821729c92',
			'thumb_exists': false,
			'bytes': 791293,
			'modified': 'Mon, 07 Apr 2014 23:16:49 +0000',
			'client_mtime': 'Mon, 07 Apr 2014 23:16:49 +0000',
			'path': '/docTreeView01.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '772.7 KB'
		}, {
			'revision': 1716,
			'rev': '6b421729c92',
			'thumb_exists': false,
			'bytes': 89111,
			'modified': 'Mon, 07 Apr 2014 14:29:30 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:14:07 +0000',
			'path': '/guantanamo.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1574,
			'rev': '62621729c92',
			'thumb_exists': false,
			'bytes': 89109,
			'modified': 'Thu, 03 Apr 2014 11:42:40 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:42:40 +0000',
			'path': '/ggg.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1676,
			'rev': '68c21729c92',
			'thumb_exists': false,
			'bytes': 89107,
			'modified': 'Thu, 03 Apr 2014 14:13:52 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 13:49:49 +0000',
			'path': '/E4Modified.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1708,
			'rev': '6ac21729c92',
			'thumb_exists': false,
			'bytes': 110242,
			'modified': 'Mon, 07 Apr 2014 13:46:10 +0000',
			'client_mtime': 'Mon, 07 Apr 2014 13:41:09 +0000',
			'path': '/plplpl.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '107.7 KB'
		}, {
			'revision': 1712,
			'rev': '6b021729c92',
			'thumb_exists': false,
			'bytes': 89107,
			'modified': 'Mon, 07 Apr 2014 14:05:59 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 13:36:15 +0000',
			'path': '/anan.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1493,
			'rev': '5d521729c92',
			'thumb_exists': false,
			'bytes': 89108,
			'modified': 'Thu, 03 Apr 2014 11:13:27 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:13:27 +0000',
			'path': '/ert.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1602,
			'rev': '64221729c92',
			'thumb_exists': false,
			'bytes': 89110,
			'modified': 'Thu, 03 Apr 2014 12:00:17 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 12:00:17 +0000',
			'path': '/yyiu.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1508,
			'rev': '5e421729c92',
			'thumb_exists': false,
			'bytes': 89107,
			'modified': 'Thu, 03 Apr 2014 11:18:11 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:18:11 +0000',
			'path': '/44.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1762,
			'rev': '6e221729c92',
			'thumb_exists': false,
			'bytes': 149651,
			'modified': 'Mon, 07 Apr 2014 20:22:46 +0000',
			'client_mtime': 'Mon, 07 Apr 2014 20:22:46 +0000',
			'path': '/Ceci est un test.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '146.1 KB'
		}, {
			'revision': 1595,
			'rev': '63b21729c92',
			'thumb_exists': false,
			'bytes': 89110,
			'modified': 'Thu, 03 Apr 2014 11:58:45 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 11:58:45 +0000',
			'path': '/uuuui.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1740,
			'rev': '6cc21729c92',
			'thumb_exists': false,
			'bytes': 89106,
			'modified': 'Mon, 07 Apr 2014 16:44:05 +0000',
			'client_mtime': 'Thu, 03 Apr 2014 10:35:28 +0000',
			'path': '/wakhdem.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '87 KB'
		}, {
			'revision': 1773,
			'rev': '6ed21729c92',
			'thumb_exists': false,
			'bytes': 16979,
			'modified': 'Mon, 07 Apr 2014 23:26:41 +0000',
			'client_mtime': 'Mon, 07 Apr 2014 23:26:41 +0000',
			'path': '/adaptation.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'dropbox',
			'mime_type': 'text/html',
			'size': '16.6 KB'
		}, {
			'revision': 1819,
			'rev': '71b21729c92',
			'thumb_exists': false,
			'bytes': 90909,
			'modified': 'Tue, 08 Apr 2014 11:25:09 +0000',
			'client_mtime': 'Tue, 08 Apr 2014 11:24:31 +0000',
			'path': '/MDR.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'app_folder',
			'mime_type': 'text/html',
			'size': '88.8 KB',
			'lienApercu': 'https://dl.dropboxusercontent.com/s/gykprlql8jux6gz/MDR.html#/apercu'
		}, {
			'revision': 1829,
			'rev': '72521729c92',
			'thumb_exists': false,
			'bytes': 90911,
			'modified': 'Tue, 08 Apr 2014 11:28:08 +0000',
			'client_mtime': 'Tue, 08 Apr 2014 11:27:39 +0000',
			'path': '/good.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'app_folder',
			'mime_type': 'text/html',
			'size': '88.8 KB',
			'lienApercu': 'https://dl.dropboxusercontent.com/s/zruyxiz694agsen/good.html#/apercu'
		}, {
			'revision': 1839,
			'rev': '72f21729c92',
			'thumb_exists': false,
			'bytes': 90909,
			'modified': 'Tue, 08 Apr 2014 11:34:21 +0000',
			'client_mtime': 'Tue, 08 Apr 2014 11:33:18 +0000',
			'path': '/LegendMan.html',
			'is_dir': false,
			'icon': 'page_white_code',
			'root': 'app_folder',
			'mime_type': 'text/html',
			'size': '88.8 KB',
			'lienApercu': 'https://dl.dropboxusercontent.com/s/bi6e99epqq5kob3/LegendMan.html#/apercu'
		}];

		$scope.deleteLienDirect = 'LienApercu';
		$scope.suprimeDocument();
		$httpBackend.flush();
		expect($scope.deleteFlag).toEqual(true);
	}));

	it('listDocumentCtrl: openModifieTitre function', inject(function() {
		expect($scope.openModifieTitre).toBeDefined();
		var data = {
			path: 'abc',
			lienApercu: 'Lienabc'
		};
		$scope.openModifieTitre(data);
		expect($scope.afficheErreurModifier).toEqual(false);
		expect($scope.videModifier).toEqual(false);
		expect($scope.nouveauTitre).toEqual('');
	}));

	it('listDocumentCtrl: modifieTitre function', inject(function($rootScope) {
		$scope.testEnv = true;
		$scope.nouveauTitre = '';
		$scope.modifieTitre();
		expect($scope.videModifier).toEqual(true);
		$scope.nouveauTitre = 'abc';
		$scope.listDocument = [{
			path: 'abc'
		}, {
			path: 'abc2'
		}];
		$scope.selectedItem = 'abc';
		$scope.nouveauTitre = 'abc2';
		$rootScope.currentUser = $scope.dataRecu;
		$scope.modifieTitre();
		expect($scope.afficheErreurModifier).toEqual(true);
		$scope.nouveauTitre = 'abc3';
		$scope.modifieTitre();
		expect($scope.flagModifieDucoment).toEqual(true);
	}));

	it('listDocumentCtrl:loadMail function', function() {
		expect($scope.loadMail).toBeDefined();
		expect($scope.displayDestination).toBeFalsy();
	});

	it('listDocumentCtrl:verifyEmail function', inject(function() {
		expect($scope.verifyEmail).toBeDefined();
		expect($scope.verifyEmail('test@test.com')).toBeTruthy();
	}));

	it('listDocumentCtrl:docPartage function', inject(function() {
		$scope.docApartager = {
			lienApercu: 'http://dropbox.com/#'
		};
		expect($scope.docPartage).toBeDefined();
		$scope.docPartage($scope.docApartager);
		expect($scope.encodedLinkFb).toEqual('http://dropbox.com/%23');

	}));

	it('listDocumentCtrl:sendMail function', inject(function($httpBackend, $rootScope, configuration) {
		$scope.destination = 'test@test.com';
		$scope.docApartager = {
			path: 'test.html'
		};
		$scope.sendMail();
		$httpBackend.flush();

		expect($scope.verifyEmail($scope.destination)).toBeTruthy();
		expect($scope.docApartager).not.toBe(null);
		expect($rootScope.myUser.dropbox.accessToken).not.toBe(null);
		expect(configuration.DROPBOX_TYPE).toBeTruthy();
		expect($rootScope.currentUser).not.toBe(null);
		expect($scope.docApartager).not.toBe(null);
		expect($scope.docApartager.path).not.toBe(null);

		$scope.sendVar = {
			to: $scope.destinataire,
			content: ' a utilisé cnedAdapt pour partager un fichier avec vous !  ' + $scope.docApartager.lienApercu,
			encoded: '<span> vient d\'utiliser cnedAdapt pour partager un fichier avec vous !   <a href=' + $scope.docApartager.lienApercu + '>Document CnedAdapt</a> </span>',
			prenom: $rootScope.currentUser.local.prenom,
			fullName: $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom,
			doc: $scope.sharedDoc
		};
		expect($scope.envoiMailOk).toBeTruthy();


	}));


	it('listDocumentCtrl:modifieTitreConfirme function', inject(function($rootScope, configuration, $httpBackend) {
		$scope.selectedItem = 'abc';
		$scope.nouveauTitre = 'abc2';
		$rootScope.currentUser.dropbox.accessToken = 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn';
		configuration.DROPBOX_TYPE = 'sandbox';
		$scope.modifieTitreConfirme();
		$httpBackend.flush();

		expect($scope.modifyCompleteFlag).toEqual(true);
	}));

	it('listDocumentCtrl:ajouterDocument', inject(function($httpBackend) {
		$scope.escapeTest = false;
		expect($scope.ajouterDocument).toBeDefined();
		$scope.ajouterDocument();
		expect($scope.errorMsg).not.toEqual('');
		$scope.doc = doc;
		$scope.ajouterDocument();
		$httpBackend.flush();
		expect($scope.errorMsg).not.toEqual('');
		$scope.doc.lienPdf = 'https://dl.dropboxusercontent.com/s/ursvf38qjs6nbgp/grammaire.pdf';
		$('<div class="modal fade" id="addDocumentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" ></div>').appendTo('body');
		$scope.ajouterDocument();
		$httpBackend.flush();
		var spyEvent;
		spyEvent = spyOnEvent('#addDocumentModal', 'hidden.bs.modal');
		$('#addDocumentModal').trigger('hidden.bs.modal');
		expect($scope.doc).toEqual({});
	}));

	it('listDocumentCtrl:setFiles', function() {
		var element = {
			files: [{
				type: 'image/png'
			}]
		};
		expect($scope.setFiles).toBeDefined();
		$scope.setFiles(element);
		expect($scope.files).toEqual(element.files);
	});

	it('listDocumentCtrl:clearUploadPdf', function() {
		expect($scope.clearUploadPdf).toBeDefined();
		$scope.clearUploadPdf();
		expect($scope.files).toEqual([]);
	});

	it('listDocumentCtrl: localSetting', inject(function($httpBackend) {
		localStorage.removeItem('listTags');
		localStorage.removeItem('listTagsByProfil');
		$scope.localSetting();
		$httpBackend.flush();
		expect($scope.flagLocalSettinglistTags).toEqual(true);
		expect($scope.flagLocalSettinglistTagsByProfil).toEqual(true);
	}));

	it('listDocumentCtrl:restructurerDocument', inject(function($httpBackend) {
		$scope.escapeTest = false;
		$scope.restructurerDocument($scope.uniqueResult);
		$httpBackend.flush();
		expect($scope.loader).toEqual(false);
	}));


});