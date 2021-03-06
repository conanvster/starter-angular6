import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SkillsService } from '../core/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private skillsService: SkillsService) {}

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    // console.log(args);
    this.skillsService.postSkills({} as any);
  }

  initForm() {
    this.form = this.fb.group({
      php: [0],
      cpp: [0],
      java: [0],
      js: [0],
      python: [0],
      ruby: [0],
      oopConcepts: [0],
      ooDesignPatterns: [0],
      exceptions: [0],
      solid: [0],
      sql: [0],
      dbDesign: [0],
      orm: [0],
      nosql: [0],
      mysql: [0],
      postgresql: [0],
      tcpIpStack: [0],
      socketsProgramming: [0],
      http: [0],
      symphony: [0],
      zend: [0],
      yii: [0],
      doctrine: [0],
      laravel: [0],
      phalcon: [0],
      angular: [0],
      vue: [0],
      react: [0],
      scrumAgile: [0],
      unitTests: [0],
      functionalTests: [0],
      tdd: [0],
      bdd: [0],
      ci: [0],
      docker: [0],
      rabbitMq: [0],
      highloadSites: [0],
      nodeJs: [0],
      restSoap: [0],
      openidOauth: [0],
      paymentSystems: [0],
      socialNetwork: [0],
      googleAmazon: [0],
      html: [0],
      css: [0],
      email: [0],
      chat: [0],
      voice: [0],
    });
  }
}
