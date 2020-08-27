"use strict"

/**
 * The FileSystem class is used for opening/writing, encoding/decoding and reading files
 *
 * @class FileSystem
 */
function FileSystem() {}

try {
	FileSystem.fs = require("fs")
} catch(e) {}

/**
 * Opens and reads a text file
 * @method readFile
 * @param {String} fname The path of the file to open
 * @param {Boolean} sync If true, the file is read in an asynchronous way
 * @param {Function} onLoad called when the file is done loading
 * @param {Function} onProgress called when there is a progress while reading the file
 * @return {String} Returns the content of the file
 */
FileSystem.readFile = function(fname, sync, onLoad, onProgress) {
	if (sync === undefined) {
		sync = true
	}

	// Check if mode available
	if (FileSystem.fs !== undefined) {
		if (sync) {
            var data = FileSystem.fs.readFileSync(fname, "utf8")

            if(onLoad !== undefined) {
                onLoad(data)
            }

            return data
		} else {
            FileSystem.fs.readFile(fname, "utf8", (err, data) => {
                if(err) return console.error(err)

                if(onLoad !== undefined) {
                    onLoad(data)
                }
            })
		}
	} else {
		var file = new XMLHttpRequest()
		file.overrideMimeType("text/plain")
		file.open("GET", fname, !sync)
		file.onload = function() {
			if (file.status === 200 || file.status === 0) {
				if (onLoad !== undefined) {
					onLoad(file.responseText)
				}
			}
		}

        if(onProgress !== undefined) {
            file.onProgress = (event) => {
                onProgress(event)
            }
        }

		file.send(null)

		return file.responseText
	}
}

/**
 * Read a file as an array buffer
 * @method readFileArrayBuffer
 * @param {String} fname The path to the file to open
 * @return {String} Returns the file data
 */
FileSystem.readFileArrayBuffer = function(fname) {
	if (FileSystem.fs !== undefined) {
		var buffer = FileSystem.fs.readFileSync(fname)
		var length = buffer.length
		var array = new ArrayBuffer(length)
		var view = new Uint8Array(array)

		for(var i = 0; i < length; i++) {
			view[i] = buffer[i]
		}

		return array
	} else {
		var file = new XMLHttpRequest()
		file.open("GET", fname, false)
		file.overrideMimeType("text/plain; charset=x-user-defined")
		file.send(null)

		return ArraybufferUtils.fromBinaryString(file.response)
	}
}

/**
 * Read a file as base64
 * @method readFileBase64
 * @param {String} fname The path to the file to open
 * @return {String} Returns the file data
 */
FileSystem.readFileBase64 = function(fname) {
	if (FileSystem.fs !== undefined) {
		var buffer = FileSystem.fs.readFileSync(fname)
		return new Buffer(buffer).toString("base64")
	} else {
		var file = new XMLHttpRequest()
		file.open("GET", fname, false)
		file.overrideMimeType("text/plain; charset=x-user-defined")
		file.send(null)

		return Base64Utils.fromBinaryString(file.response)
	}
}

/**
 * Write text file, when running without NWJS it writes a blob and autodownloads it
 *
 * @method writeFile
 * @param {String} fname The path to the file to write
 * @param {String} data The data to write in the file
 */
FileSystem.writeFile = function(fname, data) {
	if (FileSystem.fs !== undefined) {
		var stream = FileSystem.fs.createWriteStream(fname, "utf8")
		stream.write(data)
		stream.end()
	} else {
        var blob = new Blob([data], {type: "text/plain"})

        var download = document.createElement("a")
        download.download = fname
        download.href = window.URL.createObjectURL(blob)
        download.onclick = function() {
            document.body.removeChild(this)
        }
        download.style.display = "none"
        document.body.appendChild(download)

        download.click()
    }
}

/**
 * Write a binary file from base64 data
 * @method writeFileBase64
 * @param {String} fname The path to the file to write
 * @param {String} data The data to write in the file
 */
FileSystem.writeFileBase64 = function(fname, data) {
    if(FileSystem.fs !== undefined) {
        var buffer = Buffer.from(Base64Utils.removeHeader(data), "base64")

        var stream = FileSystem.fs.createWriteStream(fname)
        stream.write(buffer)
        stream.end()
    }
}

/**
 * Copies a file (this function can't be used to copy folders)
 * @method copyFile
 * @param {String} src The source file to copy
 * @param {String} dest The destination/path to the new file
 */
FileSystem.copyFile = function(src, dest) {
	if (FileSystem.fs !== undefined) {
		FileSystem.fs.createReadStream(src).pipe(FileSystem.fs.createWriteStream(dest))
	}
}

/**
 * Creates a directory (doesn't throw exception if directory already exists)
 * @method makeDirectory
 * @param {String} dir The path to create the directory
 */
FileSystem.makeDirectory = function(dir) {
	if (FileSystem.fs !== undefined) {
		try {
			FileSystem.fs.mkdirSync(dir)
		} catch(e) {}
	}
}

/**
 * Returns the files in a directory (returns empty array if something went wrong)
 * @method getFilesDirectory
 * @param {String} dir Path to the directory
 * @return {Array} An array with the files in the entered directory (if there was any error, the returned array is "[]")
 */
FileSystem.getFilesDirectory = function(dir) {
	if (FileSystem.fs !== undefined) {
		try {
			return FileSystem.fs.readdirSync(dir)
		} catch(e) {
			return []
		}
	}
	return []
}

/**
 * Copies a folder and all of its files (including symbolic links)
 * @method copyFolder
 * @param {String} src The source folder
 * @param {String} dest The destination where to copy the folder
 */
FileSystem.copyFolder = function(src, dest) {
	if (FileSystem.fs !== undefined) {
		FileSystem.makeDirectory(dest)
		var files = FileSystem.fs.readdirSync(src)

		for(var i = 0; i < files.length; i++) {
			var source = src + "/" + files[i]
			var destination = dest + "/" + files[i]
			var current = FileSystem.fs.statSync(source)

			// Directory
			if (current.isDirectory()) {
				FileSystem.copyFolder(source, destination)
			}
			// Symbolic link
			else if (current.isSymbolicLink()) {
				FileSystem.fs.symlinkSync(FileSystem.fs.readlinkSync(source), destination)
			}
			// File
			else {
				FileSystem.copyFile(source, destination)
			}
		}
	}
}

/**
 * Opens a chooser file dialog
 * @method chooseFile
 * @param {Function} onLoad onLoad callback
 * @param {String} filter Filters files which can and can't be selected (for example "images/*")
 * @param {Boolean} saveas If true, by using that dialog the files won't be opened but saved
 */
FileSystem.chooseFile = function(onLoad, filter, saveas) {
	var chooser = document.createElement("input")
	chooser.type = "file"

    if(filter !== undefined) {
        chooser.accept = filter
    }

	if (saveas !== undefined) {
        chooser.nwsaveas = (saveas !== true) ? saveas : "file"
	}

	chooser.onchange = function(e) {
		if (onLoad !== undefined) {
			onLoad(chooser.files)
		}
	}

	chooser.click()
}

/**
 * Checks if a file currently exists
 * @method fileExists
 * @param {String} file The path to the file to check
 * @return {Boolean} Returns whether the file exists or not
 */
FileSystem.fileExists = function(file) {
    if(FileSystem.fs !== undefined) {
        return FileSystem.fs.existsSync(file)
    }

    return false
}

/**
 * Gets the file name from path (always in lowercase)
 * @method getFileName
 * @param {String} file The file path to get the name from
 * @return {String} The name of the file (in lowercase)
 */
FileSystem.getFileName = function(file) {
	return file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")).toLowerCase()
}

/**
 * Gets the file name without extension
 * @method getNameWithoutExtension
 * @param {String} file Path of the file to get the name from
 * @return {String} The name of the file without its extension
 */
FileSystem.getNameWithoutExtension = function(file) {
    return file.substring(0, file.lastIndexOf("."))
}

/**
 * Get the directory of a file
 * @method getFilePath
 * @param {String} file The path of the file to get the directory from
 * @return {String} The directory of the file from the entered path
 */
FileSystem.getFilePath = function(file) {
    return file.substring(0, file.lastIndexOf("/") + 1)
}

/**
 * Get the extension of a file by using a path string
 * @method getFileExtension
 * @param {String} file The path to get the extension from
 * @return {String} The extension of the file from the entered path
 */
FileSystem.getFileExtension = function(file) {
	return file.substring(file.lastIndexOf(".") + 1, file.length)
}
