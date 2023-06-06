
// Aqui creamos, validamos is exite el drag y si no lo agregamos al div.
var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

// Definicion de variables
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

// Agregamos un evento al input para que al hacer click se elimine el valor que tiene.
fileInput.addEventListener("click", () => {
	fileInput.value = '';
	console.log("valor vacio");
});

function isMobileDevice() {
  return window.innerWidth <= 768; // Puedes ajustar el valor de 768 según tus necesidades
}
// Agregamos el evento change para que al seleccionar un archivo, cambie los valores de elementos optenidos.
fileInput.addEventListener("change", e => {

  
	console.log(" > " + fileInput.value)
	uploadIcon.innerHTML = 'check_circle';
  // debugger;
  uploadIcon.style.color = 'var(--complementary-color)';
	dragDropText.innerHTML = 'El archivo se subió con éxito!';
  // uploadButton.innerHTML = `Upload`;
	fileName.innerHTML = fileInput.files[0].name;
	fileSize.innerHTML = (fileInput.files[0].size/1024).toFixed(1) + " KB";
	uploadedFile.style.cssText = "display: flex;";
	progressBar.style.width = 0;
	fileFlag = 0;
  let isFileUploaded = fileInput.value;
	if(isFileUploaded != '') {
		if (fileFlag == 0) {
    		fileFlag = 1;
    		var width = 0;
    		var id = setInterval(frame, 50);
    		function frame() {
          if (isMobileDevice()) {
            if (width >= 290) {
        			clearInterval(id);
            // console.log("holaa amigooo");
      			} else {
        			width += 5;
        			progressBar.style.width = width + "px";
      			}
          } else {
            if (width >= 390) {
        			clearInterval(id);
              console.log("Estás en un dispositivo movil");
      			} else {
        			width += 5;
        			progressBar.style.width = width + "px";
      			}
            console.log("Estás en una laptop o computadora de escritorio");
          }
    		}
  		}
	} else {
		cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
	}

});
//Agregamos funcion al boton siguiente.
function verificar() {
  const contentUpload = document.querySelector(".upload-files-container");
  const contentMessage = document.querySelector(".upload-files-container-2");
  const htmlDocument = document.querySelector('html');
  const textTitulo = document.querySelector('.contenedor1 h4');

	let isFileUploaded = fileInput.value;
	if(isFileUploaded != '') {

		if (fileFlag == 1) {
      //Aqui vamos a poner los valores para mostrar y ocultar elementos.
      contentUpload.style.visibility = "hidden";
      contentMessage.style.display = "block";
      contentMessage.style.position = "absolute";
      debugger;
      if (isMobileDevice()) {
        htmlDocument.style.height = "130vh";
      textTitulo.style.textAlign = "center";
      } else {
        return false;
      }
      
  		}
	} else {
		cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
	}
};

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
			dragDropText.innerHTML = '¡Deja tu archivo aquí!';
		});
	});

	draggableFileArea.addEventListener("drop", e => {
		uploadIcon.innerHTML = 'check_circle';
		dragDropText.innerHTML = 'El archivo se subió con éxito!';
		// uploadButton.innerHTML = `Upload`;
		
		let files = e.dataTransfer.files;
		fileInput.files = files;
		console.log(files[0].name + " " + files[0].size);
		console.log(document.querySelector(".default-file-input").value);
		fileName.innerHTML = files[0].name;
		fileSize.innerHTML = (files[0].size/1024).toFixed(1) + " KB";
		uploadedFile.style.cssText = "display: flex;";
		progressBar.style.width = 0;
		fileFlag = 0;

    let isFileUploaded = fileInput.value;
    if(isFileUploaded != '') {
      if (fileFlag == 0) {
          fileFlag = 1;
          var width = 0;
          var id = setInterval(frame, 50);
          function frame() {
            if (isMobileDevice()) {
              if (width >= 290) {
                clearInterval(id);
                console.log("Estás en un dispositivo movil");
              // console.log("holaa amigooo");
              } else {
                width += 5;
                progressBar.style.width = width + "px";
              }
            } else {
              if (width >= 390) {
                clearInterval(id);
              } else {
                width += 5;
                progressBar.style.width = width + "px";
              }
              console.log("Estás en una laptop o computadora de escritorio");
            }
          }
        }
    } else {
      cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
    }
	});

}

removeFileButton.addEventListener("click", () => {
	uploadedFile.style.cssText = "display: none;";
	fileInput.value = '';
	uploadIcon.innerHTML = 'file_upload';
	dragDropText.innerHTML = 'Suelta tu archivo aquí o';
});
//FINN

//Limitar caracteres del texArea
const textarea = document.getElementById('first-area');
const errorMessage = document.getElementById('errorMessage');
const maxLength = 100; // Límite máximo de caracteres

textarea.addEventListener('input', function() {
  const currentLength = textarea.value.length;
  errorMessage.textContent = 'Max. 100 caracteres...';

  if (currentLength > maxLength) {
    errorMessage.textContent = 'Has excedido el límite de caracteres.';
    textarea.value = textarea.value.substring(0, maxLength); // Trunca el texto ingresado
  }
});

//Introducimos texto y lo mostramos en otro elemento.
const firstTextArea = document.querySelector('.contenedor1 textarea');
const log = document.getElementById('second-area');

firstTextArea.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = e.srcElement.value;
  // console.log(log.textContent);
}

// Obtenemos la hora
const fecha = new Date();
const hora = fecha.getHours();
const minutos = fecha.getMinutes();

const time = document.querySelector(".timestamp");
const opciones = { month: 'short', day: 'numeric' };
const formatoFecha = fecha.toLocaleDateString('en-US', opciones);

if(hora >= 12){
  if(minutos < 10){
    time.innerHTML = formatoFecha + ", " + hora + ":" + "0" + minutos + " PM";
  }else{
    time.innerHTML = formatoFecha + ", " + hora + ":" + minutos + " PM";
  }
}else{
  if(minutos < 10){
    time.innerHTML = formatoFecha + ", " + hora + ":" + "0" + minutos + " AM";
  }else{
    time.innerHTML = formatoFecha + ", " + hora + ":" + minutos + " AM";
  }
}

//Funcion volviendo al inicio.
function returnHome(){
  window.location.href = "index.html";
}


//INICIO DE LECTURA DE EXCEL Y API DE WWHATSAPP
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
    const textAreas = document.getElementById('first-area');
    // console.log(textAreas);
    const contentMessage = document.querySelector(".upload-files-container-2");
    const contentFinish = document.querySelector(".upload-files-container-3");

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
                  text: `${row.nombre} texto:${textAreas.value}`,
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
            //Aqui ocultamos el container 2 y mostramos el 3
          contentMessage.style.display = "none";
          contentFinish.style.visibility = "visible";
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



