export const DOMAIN_NAME = 'dev-wcg5m62fycja4tq5.us.auth0.com';
export const CLIENTID = 'tTj6YzdH1RXelahokozSAjJIP6SY3dXB';
export const DEVELOP_REDIRECT_URI = 'http://localhost:5173'
export const DEVELOP_ABOUT_API_ENDPOINT = 'http://localhost:8080/about'
export const DEVELOP_WORK_API_ENDPOINT = 'http://localhost:8080/work'
export const TINYMCE_API_KEY = '8lnxqokt1ogzn45wow78r1t4ia0dnasq29rm21pl3qmn12qi'
export const TINYMCE_INIT_OPTIONS = {
  toolbar_mode: 'sliding',
  body_class: 'my_class',
  height: "20rem",
  width: "50rem",
  language_url: 'http://localhost:5173/tinymce/langs/ja.js',
  language: 'ja',
  spellchecker_language: 'ja',
  content_css: 'http://localhost:5173/tinymce/css/content_css.css',
  plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  /* enable title field in the Image dialog*/
  image_title: true,
  /* enable automatic uploads of images represented by blob or data URIs*/
  automatic_uploads: true,
  /*
    URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: 'postAcceptor.php',
    here we add custom filepicker only to Image dialog
  */
  file_picker_types: 'image',
  /* and here's our custom image picker*/
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}