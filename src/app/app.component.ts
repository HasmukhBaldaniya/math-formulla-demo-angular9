import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import html2markdown from 'html2markdown';
import MathMl2LaTeX from 'mathml2latex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('ediorRef', { static: true }) editor;

  config;
  markDownContent: any = '';
  htmlContent;

  editorForm: FormGroup;

  equation = '\\sqrt{\\frac{asdasd}{asdsadsad}}';
  options = {
    displayMode: true,
  };

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
        'insertdatetime media table paste code help wordcount preview codesample textpattern latex',
      ],
      external_plugins: {
        tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
      },
      toolbar:
        'formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | subScript SuperScript tiny_mce_wiris_formulaEditor link image tinydrive | undo redo removeformat code preview codesample | help',
      theme_advanced_buttons2: 'latex',
      textpattern_patterns: [
        { start: '*', end: '*', format: 'italic' },
        { start: '**', end: '**', format: 'bold' },
        {
          start: '~',
          end: '~',
          cmd: 'createLink',
          value: 'https://tiny.cloud',
        },
        { start: '*', end: '*', format: 'italic' },
        { start: '**', end: '**', format: 'bold' },
        { start: '#', format: 'h1' },
        { start: '##', format: 'h2' },
        { start: '###', format: 'h3' },
        { start: '####', format: 'h4' },
        { start: '#####', format: 'h5' },
        { start: '######', format: 'h6' },
        { start: '1. ', cmd: 'InsertOrderedList' },
        { start: '* ', cmd: 'InsertUnorderedList' },
        { start: '- ', cmd: 'InsertUnorderedList' },
        {
          start: '1. ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'decimal' },
        },
        {
          start: '1) ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'decimal' },
        },
        {
          start: 'a. ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'lower-alpha' },
        },
        {
          start: 'a) ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'lower-alpha' },
        },
        {
          start: 'i. ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'lower-roman' },
        },
        {
          start: 'i) ',
          cmd: 'InsertOrderedList',
          value: { 'list-style-type': 'lower-roman' },
        },
      ],
      language: 'en_GB',
      forced_root_block: 'p',
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
    console.log(form.value.editor);
    this.markDownContent = '';
    this.htmlContent = '';

    const mySubString = [];
    const latex = [];
    const content = form.value.editor;

    const temp = document.createElement('div');
    temp.innerHTML = content;

    const all = temp.getElementsByTagName('*');
    let index = 0;
    for (let i = 0, max = all.length; i < max; i++) {
      const tagname = all[i] && all[i].tagName.match('math');
      if (tagname !== null && tagname !== undefined) {
        mySubString.push('<m>' + all[i].innerHTML + '</m>');
        latex.push('<m>' + MathMl2LaTeX.convert(all[i].innerHTML) + '</m>');
        // all[i].innerHTML = latex[index];
        this.markDownContent = this.markDownContent + latex[index];
        index++;
      } else {
        if (all[i] && all[i].innerHTML) {
          this.markDownContent =
            this.markDownContent + html2markdown(all[i].innerHTML);
        }
      }
    }
    console.log('Html content =>', this.markDownContent);
  }

  onGetHtml(event) {
    this.htmlContent = event;
  }
}
