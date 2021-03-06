/* File: helpers.js
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

var config = require('../../env/config.json');


var nodemailer = require('nodemailer');

// log4js.addAppender(log4js.appenders.file('../../../adaptation.log'), 'adaptation');
// log4js.addAppender(log4js.appenders.console());

//configuration du maile r
var smtpTransport = nodemailer.createTransport('SMTP', {
	host: process.env.EMAIL_HOST || config.EMAIL_HOST, // hostname
	secureConnection: true, // use SSL
	port: 465, // port for secure SMTP
	auth: {
		user: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
		pass: process.env.EMAIL_HOST_PWD || config.EMAIL_HOST_PWD
	}
});

exports.journalisation = function(status, user, message, param) {
	var statusMessage = '';
	switch (status) {
		case 0:
			statusMessage = 'BEGIN';
			break;
		case 1:
			statusMessage = 'END';
			break;
		case -1:
			statusMessage = 'END:ERROR';
			break;
		default:
			statusMessage = 'END:ERROR';
	}
	var msg = '[' + statusMessage + ']';

	if (user && user !== '' && user._id) {
		msg = msg + ' UtilisateurId : [' + user._id + '] ';
	} else {
		msg = msg + ' UtilisateurId : ' + 'GUEST';
	}

	msg = msg + ' | service :[' + message + '] | parametre :[' + param + ']';
	console.log(msg);

};

exports.sendMail = function(req, res) {
	var nodemailer = require('nodemailer');
	var sentMailInfos = req.body;
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport('SMTP', {
		host: process.env.EMAIL_HOST || config.EMAIL_HOST, // hostname
		secureConnection: true, // use SSL
		port: 465, // port for secure SMTP
		auth: {
			user: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
			pass: process.env.EMAIL_HOST_PWD || config.EMAIL_HOST_PWD
		}
	});

	// setup e-mail data with unicode symbols
	if (sentMailInfos.doc.indexOf('idProfil') !== -1) {
		var mailOptions = {
			from: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
			to: sentMailInfos.to,
			subject: sentMailInfos.fullName + ' vient de partager avec vous un profil sur l\'application CnedAdapt. ',
			text: sentMailInfos.prenom + ' ' + sentMailInfos.content,
			html: sentMailInfos.prenom + ' ' + sentMailInfos.encoded
		};
	} else {
		var mailOptions = {
			from: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
			to: sentMailInfos.to,
			subject: sentMailInfos.fullName + ' a partagé ' + sentMailInfos.doc + ' avec vous',
			text: sentMailInfos.prenom + ' ' + sentMailInfos.content,
			html: sentMailInfos.prenom + ' ' + sentMailInfos.encoded
		};
	}


	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			throw error;
		} else {
			res.send(response);
		}

		// if you don't want to use this transport object anymore, uncomment following line
		//smtpTransport.close(); // shut down the connection pool, no more messages
	});
};
exports.passwordRestoreEmail = function(emailTo, subject, content) {
	var mailOptions = {
		from: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
		to: emailTo,
		subject: subject,
		text: '',
		html: content
	};
	smtpTransport.sendMail(mailOptions, function(error) {
		if (error) {
			return false;
		} else {
			return true;
		}
	});
};

exports.sendEmail = function(req, res) {
	var emailTo = req.body.emailTo;
	var subject = req.body.subject;
	var content = req.body.content;

	console.log('emailTo ===>');
	console.log(emailTo);

	var mailOptions = {
		from: process.env.EMAIL_HOST_UID || config.EMAIL_HOST_UID,
		to: emailTo,
		subject: subject,
		text: '',
		html: content
	};
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			throw error;
		} else {
			res.send(response);
		}
	});
};

exports.clone = function(a) {
	return JSON.parse(JSON.stringify(a));
}