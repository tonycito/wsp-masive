

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  // Obtener el archivo cargado
  var file = document.getElementById("fileInput1").files[0];
  
  // Crear un lector de archivos
  var reader = new FileReader();

  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, { type: "binary" });
    var sheet_name_list = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheet_name_list[0]];

    // Obtener los datos del archivo Excel y guardarlos en un array
    var data = XLSX.utils.sheet_to_json(worksheet);

    data.forEach(function (row) {
      //       console.log(row.numero + ", " + row.nombre);

    let datos = {
        messaging_product: "whatsapp",
        preview_url: false,
        recipient_type: "individual",
        to: row.numero,
        type: "template",
        template: {
          name: "bienvenida",
          language: {
            code: "es",
            policy: "deterministic",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: row.nombre,
                },
              ],
            },
          ],
        },
      };
        fetch("https://graph.facebook.com/v16.0/{{ID_NUMBER}}/messages", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer {{TOKEN_API}}",
          "WABA-ID": "{{ID_WHATSAPP}}",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  // Leer el archivo cargado como datos binarios
  reader.readAsBinaryString(file);
});


var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

let draggableFileArea = document.querySelector(".drag-file-area");
let browseFileText = document.querySelector(".browse-files");
let uploadIcon = document.querySelector(".upload-icon");
let dragDropText = document.querySelector(".dynamic-message");
let fileInput = document.querySelector(".default-file-input");
let cannotUploadMessage = document.querySelector(".cannot-upload-message");
let cancelAlertButton = document.querySelector(".cancel-alert-button");
let uploadedFile = document.querySelector(".file-block");
let fileName = document.querySelector(".file-name");
let fileSize = document.querySelector(".file-size");
let progressBar = document.querySelector(".progress-bar");
let removeFileButton = document.querySelector(".remove-file-icon");
let uploadButton = document.querySelector(".upload-button");
let fileFlag = 0;

fileInput.addEventListener("click", () => {
	fileInput.value = '';
	console.log(fileInput.value);
});

fileInput.addEventListener("change", e => {
	console.log(" > " + fileInput.value)
	uploadIcon.innerHTML = 'check_circle';
	dragDropText.innerHTML = 'El archivo se subió con éxito!';
	// document.querySelector(".label").innerHTML = `soltar aquí o <span class="browse-files"> <input type="file" id="fileInput2" class="default-file-input" style=""/> <span class="browse-files-text" style="top: 0;">Elija el archivo</span></span>`;
	uploadButton.innerHTML = `Upload`;
	fileName.innerHTML = fileInput.files[0].name;
	fileSize.innerHTML = (fileInput.files[0].size/1024).toFixed(1) + " KB";
	uploadedFile.style.cssText = "display: flex;";
	progressBar.style.width = 0;
	fileFlag = 0;
});

uploadButton.addEventListener("click", () => {
	let isFileUploaded = fileInput.value;
	if(isFileUploaded != '') {
		if (fileFlag == 0) {
    		fileFlag = 1;
    		var width = 0;
    		var id = setInterval(frame, 50);
    		function frame() {
      			if (width >= 390) {
        			clearInterval(id);
					uploadButton.innerHTML = `<span class="material-icons-outlined upload-button-icon"> check_circle </span> Uploaded`;
      			} else {
        			width += 5;
        			progressBar.style.width = width + "px";
      			}
    		}
  		}
	} else {
		cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
	}
});

cancelAlertButton.addEventListener("click", () => {
	cannotUploadMessage.style.cssText = "display: none;";
});

if(isAdvancedUpload) {
	["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach( evt => 
		draggableFileArea.addEventListener(evt, e => {
			e.preventDefault();
			e.stopPropagation();
		})
	);

	["dragover", "dragenter"].forEach( evt => {
		draggableFileArea.addEventListener(evt, e => {
			e.preventDefault();
			e.stopPropagation();
			uploadIcon.innerHTML = 'file_download';
			dragDropText.innerHTML = 'Drop your file here!';
		});
	});

	draggableFileArea.addEventListener("drop", e => {
		uploadIcon.innerHTML = 'check_circle';
		dragDropText.innerHTML = 'El archivo se subió con éxito!';
		// document.querySelector(".label").innerHTML = `soltar aquí o <span class="browse-files"> <input type="file" id="fileInput3" class="default-file-input" style=""/> <span class="browse-files-text" style="top: -23px; left: -20px;">Elija el archivo</span> </span>`;
		uploadButton.innerHTML = `Upload`;
		
		let files = e.dataTransfer.files;
		fileInput.files = files;
		console.log(files[0].name + " " + files[0].size);
		console.log(document.querySelector(".default-file-input").value);
		fileName.innerHTML = files[0].name;
		fileSize.innerHTML = (files[0].size/1024).toFixed(1) + " KB";
		uploadedFile.style.cssText = "display: flex;";
		progressBar.style.width = 0;
		fileFlag = 0;
	});
}

removeFileButton.addEventListener("click", () => {
	uploadedFile.style.cssText = "display: none;";
	fileInput.value = '';
	uploadIcon.innerHTML = 'file_upload';
	dragDropText.innerHTML = 'Suelta tu archivo aquí o';
	// document.querySelector(".label").innerHTML = `<span class="browse-files"> <input type="file" id="fileInput" class="default-file-input"/> <span class="browse-files-text">Elija el archivo</span> <span>desde el dispositivo</span> </span>`;
	uploadButton.innerHTML = `Upload`;
});
//FINN
