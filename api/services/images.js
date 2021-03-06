/* File: images.js
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

// Require helpers
// var docStructureDao = require('../dao/docStructure');

var numberCalls = 0;
var sourcesUpload = [];
var counter = 0;
var helpers = require('../helpers/helpers');

/**
 * Crop Image
 */
/*exports.cropImage = function(req, res) {

	var extension = helper.getFileExtension(req.body.DataCrop.srcImg);
	var source = req.body.DataCrop.srcImg;
	var targetImage = './files/decoup.thumb_' + Math.random() + extension;

	// Crop image with ImageMagick
	var exec = require('child_process').exec;
	exec('convert ' + source + ' +repage -density 450 -quality 100 -crop ' + req.body.DataCrop.w + 'x' + req.body.DataCrop.h + '+' + req.body.DataCrop.x + '+' + req.body.DataCrop.y + ' ' + targetImage, function(err) {
		if (err) {
			throw err;
		} else {
			return res.jsonp({
				source: targetImage,
				order: req.body.DataCrop.order
			});
		}
	});
};*/

function imageToBase64(url) {
	var fs = require('fs');
	var bitmap = fs.readFileSync(url);
	return new Buffer(bitmap).toString('base64');
}

/* Based on node-teseract module*/
exports.oceriser = function(req, res) {

	var exec = require('child_process').exec;
	var fs = require('fs');
	var crypto = require('crypto');
	var date = new Date().getTime();

	//Replace encodedImg value by base64image
	var base64Str = req.body.encodedImg.replace('data:image/png;base64,', '');

	//image with unique hashed name
	var createdImg = 'img_' + crypto.createHash('md5').update(base64Str + date).digest('hex');
	var fullImgPath = './files/' + createdImg + '.png';

	//create PNG image from base64 string
	fs.writeFileSync(fullImgPath, new Buffer(base64Str, 'base64'));

	//Output a JPEG image
	var output = './files/out_' + crypto.createHash('md5').update(base64Str + date).digest('hex') + '.jpg';

	// console.log('convert ' + fullImgPath + ' -geometry 4000x5000 -density 300x300 -quality 80 -units PixelsPerInch -depth 8 -background white -type truecolor -define jpeg:extent=1000kb ' + output);
	//convert created PNG image to high quality JPEG image
	exec('convert ' + fullImgPath + ' -geometry 4000x5000 -density 300x300 -quality 80 -units PixelsPerInch -depth 8 -background white -type truecolor -define jpeg:extent=1000kb ' + output, function(err) {

		fs.exists(output, function(exists) {
			if (exists) {
				return 'File is there';
			} else {
				return 'File is not there';
			}
			return 'error';
		});

		if (err) {
			throw err;
		}

		//Run tesseract-ocr
		exec('tesseract ' + output + ' ' + output + ' -l fra', function(errTess) {
			if (errTess) {
				throw errTess;
			}
			fs.readFile(output + '.txt', function(err, data) {
				if (err) throw err;

				var text = data.toString('utf8');
				var trailer = '';
				if (text.length > 50) {
					trailer = text.substring(0, 50);
				} else {
					trailer = text;
				}
				helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'Output-text:[' + trailer + ']');
				res.jsonp(text);
				//remove text file
				fs.unlink(output + '.txt', function(err) {
					if (err) throw err;
					//remove JPEG image
					fs.unlink(output, function(err) {
						if (err) {
							throw err;
						}
						//remove PNG image
						fs.unlink(fullImgPath, function(err) {
							if (err) {
								throw err;
							}

						});
					});
				});
			});
		});
	});

};

/* Upload Files */
exports.uploadFiles = function(req, res) {
	var fs = require('fs');
	var filesToUpload = [];
	sourcesUpload = [];
	counter = 0;
	// console.log(req);
	if (!req.files.uploadedFile.length) {
		filesToUpload.push(req.files.uploadedFile);
		numberCalls = 1;
	} else {
		for (var i = 0; i < req.files.uploadedFile.length; i++) {
			filesToUpload.push(req.files.uploadedFile[i]);
		}
		numberCalls = filesToUpload.length;
	}

	// parcourir la liste des fichiers a uploader
	var fileReaded = fs.readFileSync(filesToUpload[0].path);
	var bufferedFile = new Buffer(fileReaded).toString('base64');
	helpers.journalisation(1, req.user, req._parsedUrl.pathname, '');
	return res.jsonp(bufferedFile);
};

/* Get number pages of PDF */
/*exports.getNumberPagesPDF = function(filePath, extension, res) {
	var exec = require('child_process').exec;
	exec('gs  -c "(' + filePath + ') (r) file runpdfbegin pdfpagecount = quit"', function(error, stdout) {
		if (error) {
			return error;
		}
		var numbPages = stdout.split('\n')[3];
		sourcesUpload.push({
			path: filePath,
			extension: extension,
			numberPages: numbPages
		});
		res.jsonp(sourcesUpload);
	});
};*/


/* Convert PDF to JPEG */
/*exports.convertsPdfToPng = function(req, res) {

	var exec = require('child_process').exec;
	var imageFileName = req.body.pdfData.source.substr(0, req.body.pdfData.source.lastIndexOf('.')) + Math.random();
	var imageConverted = imageFileName + '[' + req.body.pdfData.page + ']' + '.png';

	// Render image with imagemagick
	exec('convert -geometry 892x1263 -density 450 -quality 100 ' + req.body.pdfData.source + '[' + req.body.pdfData.page + '] -background white -alpha remove -alpha off  ' + imageConverted, function(error) {
		if (error !== null) {
			throw error;
		} else {

			return res.jsonp({
				path: imageToBase64(imageConverted),
				extension: '.png'
			});

			// Get converted files by Command
			/*exec('ls files | grep  ' + imageFileName.substr(8, imageFileName.length), function(errorls, stdoutls) {

				if (errorls !== null) {
					console.log(errorls);
					return 'error';
				}

				var files = stdoutls.replace(/\n/g, ' ').split(' ');
				for (var i = 0; i < files.length; i++) {
					if (files[i] !== '') {
						sourcesUpload.push('./files/' + files[i]);
					}
				}
				counter += 1;
				if (numberCalls === counter) {
					return res.jsonp(sourcesUpload);
				}

			});==>
		}
	});
};*/

/*exports.convertsJpegToPng = function(source, res) {

	var exec = require('child_process').exec;
	var imageFileName = source.substr(0, source.lastIndexOf('.')) + Math.random();

	// Render image with imagemagick
	exec('convert ' + source + ' ' + imageFileName + '.png', function(error) {
		if (error !== null) {
			throw error;
		} else {
			// console.log('[Done] Conversion from PDF to JPEG image' + imageFileName + '.jpg');
			
			sourcesUpload.push({
				path: imageFileName + '.png',
				extension: '.png'
			});
			counter += 1;
			if (numberCalls === counter) {
				return res.jsonp(sourcesUpload);
			}
		}
	});
};*/

/*Text to speech*/
exports.textToSpeech = function(req, res) {
	var exec = require('child_process').exec;

	var fileName = './files/audio/mp3/audio_' + Math.random() + '.mp3';

	var tmpStr = req.body.text;

	// text to speech using espeak API 
	exec('espeak -v french -s 110 "' + tmpStr + '" && espeak -v french -s 110 "' + tmpStr + '" --stdout | lame - ' + fileName, function(error) {
		if (error !== null) {
			throw error;
		} else {
			helpers.journalisation(1, req.user, req._parsedUrl.pathname, fileName);
			res.jsonp(imageToBase64(fileName));
		}

	});
};
var http = require('http');

exports.sendPdf = function(req, responce) {
	var donneRecu = req.body;
	var url = donneRecu['lien']; // jshint ignore:line
	http.get(url, function(res) {
		var chunks = [];
		if (res.statusCode !== 200) {
			helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
			responce.jsonp(404, null);
		}
		res.on('data', function(chunk) {

			chunks.push(chunk);
		});
		res.on('end', function() {
			var jsfile = new Buffer.concat(chunks).toString('base64');
			// var jsfile = Buffer.concat(chunks);
			//journalisation de l'action
			helpers.journalisation(1, req.user, req._parsedUrl.pathname, '');
			responce.header('Access-Control-Allow-Origin', '*');
			responce.header('Access-Control-Allow-Headers', 'X-Requested-With');
			responce.header('content-type', 'application/pdf');
			responce.send(200, jsfile);
		});
	}).on('error', function() {
		helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
		responce.jsonp(404, null);
	});
};

var https = require('https');
exports.sendPdfHTTPS = function(req, responce) {
	var donneRecu = req.body;
	var url = donneRecu['lien']; // jshint ignore:line
	https.get(url, function(res) {
		var chunks = [];
		if (res.statusCode !== 200) {
			helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
			responce.jsonp(404, null);
		}
		res.on('data', function(chunk) {

			chunks.push(chunk);
		});
		res.on('end', function() {
			var jsfile = new Buffer.concat(chunks).toString('base64');
			// var jsfile = Buffer.concat(chunks);
			helpers.journalisation(1, req.user, req._parsedUrl.pathname, '');
			responce.header('Access-Control-Allow-Origin', '*');
			responce.header('Access-Control-Allow-Headers', 'X-Requested-With');
			responce.header('content-type', 'application/pdf');
			responce.send(jsfile);
		});
	}).on('error', function() {
		helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
		responce.jsonp(404, null);
	});
};



exports.previewPdf = function(req, responce) {
	var donneRecu = req.body;
	var url = donneRecu['lien']; // jshint ignore:line
	http.get(url, function(res) {
		var chunks = [];
		if (res.statusCode !== 200) {
			helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
			responce.jsonp(404, null);
		}
		res.on('data', function(chunk) {
			chunks.push(chunk);
			var jsfile = new Buffer.concat(chunks).toString('base64');
			jsfile = jsfile.substring(0, 100);
			responce.header('Access-Control-Allow-Origin', '*');
			responce.header('Access-Control-Allow-Headers', 'X-Requested-With');
			responce.header('content-type', 'application/pdf');
			responce.send(200, jsfile);
		});
	}).on('error', function() {
		helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
		responce.jsonp(404, null);
	});
};

exports.previewPdfHTTPS = function(req, responce) {
	var donneRecu = req.body;
	var url = donneRecu['lien']; // jshint ignore:line
	https.get(url, function(res) {
		var chunks = [];
		if (res.statusCode !== 200) {
			helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
			responce.jsonp(404, null);
		}
		res.on('data', function(chunk) {

			chunks.push(chunk);
			var jsfile = new Buffer.concat(chunks).toString('base64');
			jsfile = jsfile.substring(0, 100);
			responce.header('Access-Control-Allow-Origin', '*');
			responce.header('Access-Control-Allow-Headers', 'X-Requested-With');
			responce.header('content-type', 'application/pdf');
			responce.send(200, jsfile);
		});
	}).on('error', function() {
		helpers.journalisation(-1, req.user, req._parsedUrl.pathname, '');
		responce.jsonp(404, null);
	});
};