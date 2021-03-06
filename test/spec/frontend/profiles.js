/* File: profiles.js
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

describe('Controller:ProfilesCtrl', function() {
  var $scope, controller;
  var profils = [{
    _id: '52d8f876548367ee2d000004',
    photo: './files/profilImage.jpg',
    descriptif: 'descriptif',
    nom: 'Nom'
  }, {
    _id: '52d8f928548367ee2d000006',
    photo: './files/profilImage.jpg',
    descriptif: 'descriptif2',
    nom: 'Nom2'
  }];

  var tags = [{
    _id: '52c6cde4f6f46c5a5a000004',
    libelle: 'Exercice'
  }, {
    _id: '52c588a861485ed41c000002',
    libelle: 'Cours'
  }];

  var profil = {
    _id: '52d8f928548367ee2d000006',
    photo: './files/profilImage.jpg',
    descriptif: 'descriptif3',
    nom: 'Nom3'
  };

  var profilTag = {
    _id: '52d8f928548367ee2d000006',
    tag: 'tag',
    texte: 'texte',
    profil: 'profil',
    tagName: 'tagName',
    police: 'Arial',
    taille: 'eight',
    interligne: 'fourteen',
    styleValue: 'Bold'
  };

  beforeEach(module('cnedApp'));

  beforeEach(inject(function($controller, $rootScope, $httpBackend, configuration) {
    $scope = $rootScope.$new();
    controller = $controller('ProfilesCtrl', {
      $scope: $scope
    });

    $scope.dataRecu = {
      __v: 0,
      _id: '5329acd20c5ebdb429b2ec66',
      dropbox: {
        accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
        country: 'MA',
        display_name: 'youbi anas', // jshint ignore:line
        emails: 'anasyoubi@gmail.com',
        referral_link: 'https://db.tt/wW61wr2c', // jshint ignore:line
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
      },
      loged: true,
      dropboxWarning: true,
      admin: true
    };
    $scope.currentUserData = $scope.dataRecu;
    localStorage.setItem('compteId', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec');

    $httpBackend.whenGET(configuration.URL_REQUEST + '/listerProfil').respond(profils);

    $scope.profil = profil;
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/ajouterProfils').respond(profil);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/deleteProfil').respond(profil);

    $httpBackend.whenPOST(configuration.URL_REQUEST + '/updateProfil').respond(profil);
    $httpBackend.whenGET(configuration.URL_REQUEST + '/readTags').respond(tags);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherTagsParProfil').respond(tags);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/ajouterProfilTag').respond(profilTag);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/supprimerProfilTag').respond(profilTag);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/modifierProfilTag').respond(profilTag);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/profilParUser').respond(profils);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/addUserProfil').respond(profils);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/removeUserProfile').respond(profils);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/setDefaultProfile').respond(profils);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherProfilDefaut').respond(profils);
    $httpBackend.whenGET(configuration.URL_REQUEST + '/profile?id=' + $scope.dataRecu.local.token).respond($scope.dataRecu);
    $httpBackend.whenPOST(configuration.URL_REQUEST + '/defaultByUserProfilId').respond(profils);


    $scope.editTag = [{
      _id: '52c6cde4f6f46c5a5a000004',
      libelle: 'Exercice',
      disabled: true
    }, {
      _id: '52c6cde4f6f46c5a5a000006',
      libelle: 'Exercice',
      disabled: false
    }];
    $scope.tagStyles = [{
      tag: '52c6cde4f6f46c5a5a000004',
      interligne: 'ten',
      label: 'titre',
      police: 'Arial',
      style: '',
      styleValue: 'Bold',
      taille: 'twelve',
      state: true

    }, {
      tag: '52c6cde4f6f46c5a5a000008',
      interligne: 'ten',
      label: 'titre',
      police: 'Arial',
      style: '',
      styleValue: 'Bold',
      taille: 'twelve',
      state: true
    }];

    $scope.listTags = [{
      _id: '52c6cde4f6f46c5a5a000004',
      libelle: 'Exercice',
      disabled: true
    }, {
      _id: '52c6cde4f6f46c5a5a000006',
      libelle: 'Exercice',
      disabled: false
    }];

    $scope.tagList = [{
      _id: '52c6cde4f6f46c5a5a000004',
      libelle: 'Exercice',
      disabled: true
    }, {
      _id: '52c6cde4f6f46c5a5a000006',
      libelle: 'Exercice',
    }];

    $scope.tagListTest = $scope.tagList;

    $scope.currentTagEdit = {
      'libelle': 'Exercice',
      '_id': '52e8c721c32a9a0d1b885b0f',
      '__v': 0
    };
    $scope.currentTag = $scope.tagList;
    $scope.currentTagProfil = {};

    $scope.parameter = {
      tag: '52c6cde4f6f46c5a5a000008',
      interligne: 'ten',
      label: 'titre',
      police: 'Arial',
      style: '',
      styleValue: 'Bold',
      taille: 'twelve'
    };

    $scope.profMod = {
      _id: '52c6cde4f6f46c5a5a000004'
    };

    $scope.tagProfilInfos = [{
      id: '52c6cde4f6f46c5a5a000004',
      texte: 'texte1',
      police: 'police1',
      taille: 'taille1',
      interligne: 'interligne1',
      styleValue: 'style1',
      coloration: 'coloration1'

    }, {
      id: '52c6cde4f6f46c5a5a000008',
      texte: 'texte2',
      police: 'police2',
      taille: 'taille2',
      interligne: 'interligne2',
      styleValue: 'style2',
      coloration: 'coloration2'
    }];

    $scope.deletedParams = [{
      param: $scope.tagStyles[0]
    }];



  }));

  /* Defined Arrays*/
  it('ProfilesCtrl:Arrays should be defined', inject(function() {
    expect($scope.tailleLists).toBeDefined();
    expect($scope.interligneLists).toBeDefined();
  }));

  /* ProfilesCtrl afficherProfilsClear*/
  it('ProfilesCtrl:afficherProfilsClear should set afficherProfilsClear ', inject(function() {
    expect($scope.afficherProfilsClear).toBeDefined();
  }));

  it('ProfilesCtrl:afficherProfilsClear should call /listerProfil on $scope.afficherProfilsClear()', inject(function($httpBackend) {
    $scope.afficherProfilsClear();
    $httpBackend.flush();
  }));

  it('ProfilesCtrl:afficherProfilsClear should listeProfils be profils', inject(function($httpBackend) {
    $scope.afficherProfilsClear();
    $httpBackend.flush();
    expect($scope.listeProfils.length).toBe(2);
    expect($scope.tagStyles).toEqual([]);
  }));

  /* ProfilesCtrl isTagStylesNotEmpty */
  it('ProfilesCtrl:isTagStylesNotEmpty should set isTagStylesNotEmpty ', inject(function() {
    expect($scope.isTagStylesNotEmpty).toBeDefined();
    $scope.isTagStylesNotEmpty();
    expect($scope.tagStyles.length).toBe(2);
  }));



  /* ProfilesCtrl:listerProfil */

  it('ProfilesCtrl:afficherProfils should set afficherProfils ', inject(function() {
    expect($scope.afficherProfils).toBeDefined();
  }));

  it('ProfilesCtrl:afficherProfils should call /listerProfil on $scope.afficherProfils()', inject(function($httpBackend) {
    $scope.afficherProfils();
    $httpBackend.flush();
  }));

  it('ProfilesCtrl:afficherProfils should listeProfils be profils', inject(function($httpBackend) {
    $scope.afficherProfils();
    $httpBackend.flush();
    expect($scope.listeProfils).toEqual(profils);
    expect($scope.listeProfils.length).toBe(2);
  }));

  /* ProfilesCtrl:ajouterTag */

  it('ProfilesCtrl:ajouterProfil should set ajouterProfil ', inject(function() {
    expect($scope.ajouterProfil).toBeDefined();
  }));
  it('ProfilesCtrl:ajouterProfil should set photo property', inject(function() {
    expect($scope.profil.photo).toBe('./files/profilImage.jpg');
  }));

  it('ProfilesCtrl:ajouterProfil should call /ajouterProfils on $scope.ajouterProfil()', inject(function($httpBackend) {
    $scope.ajouterProfil();
    $httpBackend.flush();
  }));

  it('ProfilesCtrl:ajouterProfil should profil be $scope.profilFlag', inject(function($httpBackend) {
    $scope.ajouterProfil();
    $httpBackend.flush();
    expect(profil).toEqual($scope.profilFlag);
    var testVariableProfil = [{
      _id: '52d8f876548367ee2d000004',
      photo: './files/profilImage.jpg',
      descriptif: 'descriptif',
      nom: 'Nom'
    }, {
      _id: '52d8f928548367ee2d000006',
      photo: './files/profilImage.jpg',
      descriptif: 'descriptif2',
      nom: 'Nom2'
    }];
    expect($scope.addUserProfilFlag).toEqual(testVariableProfil);
    expect($scope.chercherProfilDefautFlag).toEqual(profils);
  }));

  /* ProfilesCtrl:supprimerProfil */

  it('ProfilesCtrl:supprimerProfil should set supprimerProfil ', inject(function() {
    expect($scope.preSupprimerProfil).toBeDefined();
    expect($scope.supprimerProfil).toBeDefined();
  }));

  it('ProfilesCtrl:supprimerProfil should call /deleteProfil on $scope.supprimerProfil()', inject(function($httpBackend) {
    $scope.preSupprimerProfil(profil);
    $scope.supprimerProfil();
    $httpBackend.flush();
  }));

  it('ProfilesCtrl:supprimerProfil should profil be $scope.profilFlag', inject(function($httpBackend) {
    $scope.preSupprimerProfil(profil);
    $scope.supprimerProfil();
    $httpBackend.flush();
    expect($scope.profilFlag).toEqual(profil);
    var deletedProfile = [{
      _id: '52d8f876548367ee2d000004',
      photo: './files/profilImage.jpg',
      descriptif: 'descriptif',
      nom: 'Nom'
    }, {
      _id: '52d8f928548367ee2d000006',
      photo: './files/profilImage.jpg',
      descriptif: 'descriptif2',
      nom: 'Nom2'
    }];
    expect($scope.removeUserProfileFlag).toEqual(deletedProfile);
  }));

  /* ProfilesCtrl:preModifierProfil */

  it('ProfilesCtrl:preModifierProfil should set preModifierProfil ', inject(function($httpBackend) {

    $scope.preModifierProfil(profil);
    $scope.modifierProfil();
    $httpBackend.flush();
    expect($scope.tagStylesFlag).toEqual(tags);
  }));

  it('ProfilesCtrl:modifierProfil should set modifierProfil ', inject(function($httpBackend) {
    $scope.profMod = {};
    $scope.profMod.nom = 'nom';
    $scope.profMod.descriptif = 'descriptif';
    expect($scope.modifierProfil).toBeDefined();
    $scope.modifierProfil();
    $httpBackend.flush();
    expect($scope.addFieldError.length).toEqual(0);
    expect($scope.profilFlag).toEqual(profil);
    expect($scope.affichage).toBeFalsy();
  }));

  /* ProfilesCtrl:afficherTags() */

  it('ProfilesCtrl:afficherTags should set afficherTags ', inject(function() {
    expect($scope.afficherTags).toBeDefined();
  }));

  it('ProfilesCtrl:afficherTags should call /readTags on $scope.afficherTags()', inject(function($httpBackend) {
    $scope.afficherTags();
    $httpBackend.flush();
  }));

  it('ProfilesCtrl:afficherTags should listTags be tags', inject(function($httpBackend) {

    $scope.afficherTags();
    $httpBackend.flush();
    expect($scope.listTags.length).toBe(2);
    expect($scope.tagStyles[0].tag).toBe($scope.listTags[0]._id);
    expect($scope.listTags[0].disabled).toBeTruthy();

  }));

  /* ProfilesCtrl:ajouterProfilTag() */

  it('ProfilesCtrl:ajouterProfilTag should set ajouterProfilTag ', inject(function($httpBackend) {
    expect($scope.ajouterProfilTag).toBeDefined();
    $scope.ajouterProfilTag(profil._id);
    $httpBackend.flush();
    expect($scope.profilTagFlag).toEqual(profilTag);

  }));

  /* ProfilesCtrl:affectDisabled() */

  it('ProfilesCtrl:affectDisabled should set affectDisabled ', inject(function() {
    expect($scope.affectDisabled).toBeDefined();
    $scope.affectDisabled(true);
    expect($scope.affectDisabled).toBeTruthy();

  }));

  /* ProfilesCtrl:validerStyleTag() */

  it('ProfilesCtrl:validerStyleTag should set validerStyleTag ', inject(function() {
    expect($scope.validerStyleTag).toBeDefined();
    $scope.tagList = '{"_id":"52c6cde4f6f46c5a5a000004","libelle":"Exercice"}'; // jshint ignore:line

    $scope.validerStyleTag();

    $scope.parsedVar = {
      _id: '52c6cde4f6f46c5a5a000004',
      libelle: 'Exercice'
    };
    expect($scope.currentTag).toEqual($scope.parsedVar);
    expect($scope.listTags[0]._id).toEqual($scope.currentTag._id);
    expect($scope.tagID).toEqual($scope.listTags[0]._id);
    expect($scope.listTags[0].disabled).toBeTruthy();
    expect($scope.tagStyles.length).toBeGreaterThan(0);
    expect($scope.colorationCount).toEqual(0);
    expect($scope.tagList).toBe(null);
    expect($scope.policeList).toBe(null);
    expect($scope.tailleList).toBe(null);
    expect($scope.interligneList).toBe(null);
    expect($scope.weightList).toBe(null);
    expect($scope.colorList).toBe(null);

  }));

  it('ProfilesCtrl:editionAddProfilTag should set editionAddProfilTag ', inject(function($httpBackend) {
    expect($scope.editionAddProfilTag).toBeDefined();
    $scope.editionAddProfilTag();
    $httpBackend.flush();
    expect($scope.editionFlag).toEqual(profilTag);
    $scope.afficherProfils();
    expect($scope.tagStyles.length).toBe(0);
    expect($scope.tagStyles).toEqual([]);
    expect($scope.tagList).toEqual({});
    expect($scope.policeList).toEqual(null);
    expect($scope.tailleList).toEqual(null);
    expect($scope.interligneList).toEqual(null);
    expect($scope.weightList).toEqual(null);
    expect($scope.editTag).toEqual(null);
    expect($scope.colorList).toEqual(null);
    $scope.noStateVariableFlag = true;
    $scope.editionAddProfilTag();
    $httpBackend.flush();
    expect($scope.modProfilFlag).toEqual(profilTag);
    expect($scope.noStateVariableFlag).toBeFalsy();
    $scope.trashFlag = true;
    $scope.editionAddProfilTag();
    $httpBackend.flush();
    expect($scope.editionSupprimerTagFlag).toEqual(profilTag);
    expect($scope.trashFlag).toBeFalsy();
    expect($scope.currentTagProfil).toBe(null);
    expect($scope.deletedParams).toEqual([]);


  }));

  it('ProfilesCtrl:editerStyleTag should set editerStyleTag ', inject(function() {
    expect($scope.editerStyleTag).toBeDefined();
    expect($scope.listTags[0].disabled).toBeTruthy();
    expect($scope.tagStyles.length).not.toBe(0);
  }));
  it('ProfilesCtrl:editerStyleTag should set editerStyleTag ', inject(function() {
    $scope.currentTagProfil = null;
    $scope.editTag = '{"libelle":"Exercice","_id":"52e8c721c32a9a0d1b885b0f","__v":0}';
    expect($scope.currentTagEdit).toEqual(JSON.parse($scope.editTag));

    expect($scope.editerStyleTag).toBeDefined();
    expect($scope.listTags[0].disabled).toBeTruthy();
    expect($scope.tagStyles.length).not.toBe(0);
  }));

  it('ProfilesCtrl:ajoutSupprimerTag should set ajoutSupprimerTag ', inject(function() {
    /*jshint camelcase: false */
    $scope.parameter = {
      id_tag: '52c6cde4f6f46c5a5a000006',
      libelle: 'Exercice',
    };
    expect($scope.ajoutSupprimerTag).toBeDefined();
    $scope.ajoutSupprimerTag($scope.parameter);
    expect($scope.tagStyles.indexOf($scope.parameter)).toBe(-1);
    expect($scope.tagStyles.length).toBe(2);
    expect($scope.parameter.id_tag).toEqual($scope.listTags[1]._id);
    expect($scope.listTags[1].disabled).toBeFalsy();


  }));

  it('ProfilesCtrl:editionSupprimerTag should set editionSupprimerTag ', inject(function() {
    expect($scope.editionSupprimerTag).toBeDefined();
    $scope.editionSupprimerTag($scope.parameter);
    expect($scope.tagStyles.indexOf($scope.parameter)).toBe(-1);
    expect($scope.tagStyles.length).toBe(2);
    expect($scope.listTags[1].disabled).toBeFalsy();
    expect($scope.trashFlag).toBeTruthy();
    expect($scope.currentTagProfil).toBe(null);

    $scope.parameter = {
      tag: '52c6cde4f6f46c5a5a000004',
      interligne: 'ten',
      label: 'titre',
      police: 'Arial',
      style: '',
      styleValue: 'Bold',
      taille: 'twelve',
      state: true
    };
    $scope.editionSupprimerTag($scope.parameter);
    expect($scope.parameter.state).toBeTruthy();
    expect($scope.parameter.tag).toEqual($scope.listTags[0]._id);
    expect($scope.listTags[0].disabled).toBeFalsy();
    expect($scope.currentTagProfil).toBe(null);
    expect($scope.policeList).toBe(null);
    expect($scope.tailleList).toBe(null);
    expect($scope.interligneList).toBe(null);
    expect($scope.colorList).toBe(null);
    expect($scope.weightList).toBe(null);

    $scope.parameter = {
      tag: '52c6cde4f6f46c5a5a000006',
      interligne: 'ten',
      label: 'titre',
      police: 'Arial',
      style: '',
      styleValue: 'Bold',
      taille: 'twelve',
      state: false
    };
    $scope.editionSupprimerTag($scope.parameter);
    expect($scope.parameter.tag).toEqual($scope.listTags[1]._id);
    expect($scope.listTags[1].disabled).toBeFalsy();

  }));
  it('ProfilesCtrl:editHyphen()', inject(function() {
    expect($scope.editHyphen).toBeDefined();
    $scope.editHyphen();

  }));
  it('ProfilesCtrl:checkStyleTag()', inject(function() {
    expect($scope.checkStyleTag).toBeDefined();
    $scope.checkStyleTag();
    expect($scope.tagStyles.length).toBeGreaterThan(0);
    expect($scope.checkStyleTag()).toBeFalsy();
    $scope.tagStyles.length = 0;
    $scope.trashFlag = true;
    $scope.checkStyleTag();
    expect($scope.checkStyleTag()).toBeFalsy();



  }));
  it('ProfilesCtrl:reglesStyleChange()', inject(function() {
    expect($scope.reglesStyleChange).toBeDefined();
    $scope.reglesStyleChange();


  }));
  it('ProfilesCtrl:editStyleChange()', inject(function() {
    expect($scope.editStyleChange).toBeDefined();
    $scope.editStyleChange();


  }));

  it('ProfilesCtrl:editionModifierTag()', inject(function() {
    expect($scope.editionModifierTag).toBeDefined();
    $scope.editionModifierTag($scope.tagStyles[0]);
    expect($scope.currentTagProfil).toBe($scope.tagStyles[0]);
    expect($scope.listTags.disabled).toBeFalsy();
    expect($scope.policeList).toBe($scope.tagStyles[0].police);
    expect($scope.tailleList).toBe($scope.tagStyles[0].taille);
    expect($scope.interligneList).toBe($scope.tagStyles[0].interligne);
    expect($scope.weightList).toBe($scope.tagStyles[0].styleValue);
    expect($scope.colorList).toBe($scope.tagStyles[0].coloration);
    $scope.editStyleChange('police', $scope.policeList);
    $scope.editStyleChange('taille', $scope.tailleList);
    $scope.editStyleChange('interligne', $scope.interligneList);
    $scope.editStyleChange('style', $scope.weightList);
    $scope.editStyleChange('coloration', $scope.colorList);


  }));
  it('ProfilesCtrl:editerStyleTag()', inject(function($httpBackend) {
    expect($scope.editerStyleTag).toBeDefined();
    $scope.editerStyleTag();
    $httpBackend.flush();
    expect($scope.editTag).toEqual(null);
    expect($scope.policeList).toEqual(null);
    expect($scope.tailleList).toEqual(null);
    expect($scope.interligneList).toEqual(null);
    expect($scope.weightList).toEqual(null);
    expect($scope.colorList).toEqual(null);

  }));
  it('ProfilesCtrl:editerStyleTag() should be inside !$scope.currentTagProfil condition', inject(function() {
    $scope.currentTagProfil = null;
    $scope.currentTagEdit = null;
    $scope.editTag = '{"_id":"52c6cde4f6f46c5a5a000004","libelle":"Exercice","disabled":true}';
    expect($scope.editerStyleTag).toBeDefined();
    $scope.editerStyleTag();
    expect($scope.currentTagProfil).toBe(null);

    $scope.parsedVar = {
      _id: '52c6cde4f6f46c5a5a000004',
      libelle: 'Exercice',
      disabled: true
    };

    expect($scope.currentTagEdit).toEqual($scope.parsedVar);
    expect($scope.listTags[0]._id).toEqual($scope.currentTagEdit._id);
    expect($scope.listTags[0].disabled).toBeTruthy();
    expect($scope.tagStyles.length).toBeGreaterThan(0);
  }));

  it('ProfilesCtrl:initProfil()', inject(function($httpBackend) {
    expect($scope.initProfil).toBeDefined();
    $scope.initProfil();
    $httpBackend.flush();
    expect($scope.dataRecu.loged).toBeTruthy();
  }));

  it('ProfilesCtrl:beforeValidationAdd()', inject(function() {
    expect($scope.beforeValidationAdd).toBeDefined();
    $scope.beforeValidationAdd();
    $scope.tagList = null;
    $scope.policeList = null;
    $scope.tailleList = null;
    $scope.interligneList = null;
    $scope.colorList = null;
    $scope.weightList = null;

    expect($scope.addFieldError[0]).toBe(' Police ');
    expect($scope.addFieldError[1]).toBe(' Taille ');
    expect($scope.tagList).toBe(null);
    expect($scope.addFieldError[2]).toBe(' Interligne ');
    expect($scope.policeList).toBe(null);
    expect($scope.addFieldError[3]).toBe(' Coloration ');
    expect($scope.tailleList).toBe(null);
    expect($scope.addFieldError[4]).toBe(' Style ');
    expect($scope.interligneList).toBe(null);
  }));

  it('ProfilesCtrl:beforeValidationModif()', inject(function() {
    expect($scope.beforeValidationModif).toBeDefined();
    $scope.beforeValidationModif();
    $scope.editList = null;
    $scope.policeList = null;
    $scope.tailleList = null;
    $scope.interligneList = null;
    $scope.colorList = null;
    $scope.weightList = null;

    expect($scope.addFieldError[0]).toBe(' Nom ');
    expect($scope.addFieldError[1]).toBe(' Descriptif ');
    expect($scope.editList).toBe(null);
    expect($scope.addFieldError[2]).toBe(' Police ');
    expect($scope.policeList).toBe(null);
    expect($scope.addFieldError[3]).toBe(' Taille ');
    expect($scope.tailleList).toBe(null);
    expect($scope.addFieldError[4]).toBe(' Interligne ');
    expect($scope.interligneList).toBe(null);
  }));

  it('ProfilesCtrl:currentUser()', inject(function($httpBackend) {
    expect($scope.currentUser).toBeDefined();
    $scope.currentUser();
    $httpBackend.flush();
    expect($scope.currentUserData).toEqual($scope.dataRecu);
  }));

  it('ProfilesCtrl:afficherProfilsParUser()', inject(function($httpBackend) {
    expect($scope.afficherProfilsParUser).toBeDefined();
    $scope.afficherProfilsParUser();
    $httpBackend.flush();
    expect($scope.listeProfilsParUser).toEqual(profils);
    expect($scope.defaultByUserProfilIdFlag).toEqual(profils);

  }));

  it('ProfilesCtrl:mettreParDefaut()', inject(function($httpBackend) {
    var param = {
      nom: 'Nom2',
      descriptif: 'descriptif',
      photo: '/9j/4AAQSkZJRgABAQAAAQABAAD/wCVAA/9k=',
      owner: '5334398c0bbd4cd21daecf5b',
      _id: '5334398c0bbd4cd21daecf5c'
    };

    expect($scope.mettreParDefaut).toBeDefined();
    $scope.mettreParDefaut(param);
    $scope.defaultVar = {
      userID: '5334398c0bbd4cd21daecf5b',
      profilID: '533436a90bbd4cd21daecf4b',
      defaultVar: true
    };
    $httpBackend.flush();
    expect($scope.defaultVarFlag).toEqual(profils);
  }));


  it('ProfilesCtrl:isDefault()', inject(function() {
    expect($scope.isDefault).toBeDefined();
    var param = {
      _id: '5334745da32a6fc976535670',
      defaut: true,
      descriptif: 'test',
      nom: 'test',
      owner: '5334743ca32a6fc97653566c'
    };
    expect($scope.isDefault(param)).toBeTruthy();

  }));


});