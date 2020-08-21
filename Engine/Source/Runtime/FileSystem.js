"use strict"

function FileSystem() {}

try {
	FileSystem.fs = require("fs")
} catch(e) {}

// Read text file
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
			FileSystem.fs.readFile(fname, "utf8", onLoad)
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

// Read file as arraybuffer data
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

// Read File as Base64 data
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

// Write text file
FileSystem.writeFile = function(fname, data) {
	if (FileSystem.fs !== undefined) {
		var stream = FileSystem.fs.createWriteStream(fname, "utf8")
		stream.write(data)
		stream.end()
	}
}

// Write binary file from base64 data
FileSystem.writeFileBase64 = function(fname, data) {
    if(FileSystem.fs !== undefined) {
        var buffer = Buffer.from(Base64Utils.removeHeader(data), "base64")

        var stream = FileSystem.fs.createWriteStream(fname)
        stream.write(buffer)
        stream.end()
    }
}

// Copy file (can't be used to copy folders)
FileSystem.copyFile = function(src, dest) {
	if (FileSystem.fs !== undefined) {
		FileSystem.fs.createReadStream(src).pipe(FileSystem.fs.createWriteStream(dest))
	}
}

// Make a directory (don't throw exception if directory already exists)
FileSystem.makeDirectory = function(dir) {
	if (FileSystem.fs !== undefined) {
		try {
			FileSystem.fs.mkdirSync(dir)
		} catch(e) {}
	}
}

// Returns files in directory (returns empty array in case of error)
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

// Copy folder and all its files (includes symbolic links)
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

// Open chooser file dialog, receives callback function, file filter, saveas
FileSystem.chooseFile = function(callback, filter, saveas) {
	var chooser = document.createElement("input")
	chooser.type = "file"

    if(filter !== undefined) {
        chooser.accept = filter
    }

	if (saveas !== undefined) {
        chooser.nwsaveas = (saveas !== true) ? saveas : "file"
	}

	chooser.onchange = function(e) {
		if (callback !== undefined) {
			callback(chooser.files)
		}
	}

	chooser.click()
}

FileSystem.fileExists = function(file) {
    if(FileSystem.fs !== undefined) {
        return FileSystem.fs.existsSync(file)
    }

    return false
}

// Get file name from file path string (always in lowercase)
FileSystem.getFileName = function(file) {
	return file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")).toLowerCase()
}

// Get file name without extension
FileSystem.getNameWithoutExtension = function(file) {
    return file.substring(0, file.lastIndexOf("."))
}

// Get file directory
FileSystem.getFilePath = function(file) {
    return file.substring(0, file.lastIndexOf("/") + 1)
}

// Get file extension from file path string
FileSystem.getFileExtension = function(file) {
	return file.substring(file.lastIndexOf(".") + 1, file.length)
}
