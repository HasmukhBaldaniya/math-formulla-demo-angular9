import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  config;

  editorForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initialization();
    this.createForm();
  }

  initialization() {
    this.config = {
      height: 500,
      menubar: true,
      resize: false,
      autosave_ask_before_unload: false,
      powerpaste_allow_local_images: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor image',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount preview codesample',
      ],
      external_plugins: {
        tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
      },

      toolbar:
        'formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | subScript SuperScript tiny_mce_wiris_formulaEditor link image tinydrive | undo redo removeformat code preview codesample | help',
      language: 'en_GB',
      tinydrive_token_provider(success, failure) {
        success({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo',
        });
      },
      /* without images_upload_url set, Upload tab won't show up*/
      images_upload_url: 'postAcceptor.php',
      /* we override default upload handler to simulate successful upload*/
      images_upload_handler(blobInfo, success, failure) {
        setTimeout(() => {
          /* no matter what you upload, we will turn it into TinyMCE logo :)*/
          success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
        }, 2000);
      },
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    };
  }

  createForm() {
    this.editorForm = this.fb.group({
      editor: [''],
    });
  }

  onSubmitForm(form: FormGroup) {
    console.log('form =>', form.value.editor);
  }
}
