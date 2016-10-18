import { inject } from 'aurelia-dependency-injection';
import { ValidationRules, ValidationControllerFactory } from 'aurelia-validation';
import { BootstrapFormRenderer } from './resources/validation-render/bootstrap-render';

@inject(ValidationControllerFactory)
export class RegistrationForm {
  firstName: string; lastName: string; email: string; controller = null;
  tam: boolean;
  widt = false;
  constructor(controller: ValidationControllerFactory) {
    this.controller = controller.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }
  activate() {
  }
  submit() {
    let errors = this.controller.validate();

  }
  reset() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.controller.reset();
  }
  attached() {
    // ($('.ui.checkbox') as any).checkbox();
    // ($('.ui .dropdown') as any).dropdown();
    // ($('.ui.accordion') as any).accordion();
    // ($('.rating') as any).rating();
    // ($('.teal.button') as any)
    //   .popup({
       
    //   });
    // ($('input') as any)
    //   .popup({
      
    //   });
    // ($('.ui.search') as any)
    //   .search({
    //     source: this.content
    //   })
     
          //  ($("#music")as any).click(function () {
          //       ($('.ui.modal') as any).modal('show');     
          // });  
//     ($ as any).fn.form.settings.rules.myCustomRule = function (param) {
//       // Your validation condition goes here
//      var paramList:any;
//         ($ as any).ajax({
//             type: "GET",
//             async: false,
//             url: "https://api.github.com/users",
//             contentType: "application/json; charset=utf-8",
//             success: function (msg) {
//                 //var data = msg;
//               paramList = msg;
           
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 //alert("get session failed " + errorThrown);
//             }
//         });
//         //return 
      
//         return paramList.filter(x=>{return x.login==param}).length==0?true:false;
    
//     };
    
//   ($('.ui.form')as any)
//   .form({
//     fields: {
//       name: {
//         identifier: 'name',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter your name'
//           },
//           {
//             type   : 'myCustomRule[name]',
//             prompt : 'your name exist'
//           }
//         ]
//       },
//       skills: {
//         identifier: 'skills',
//         rules: [
//           {
//             type   : 'minCount[2]',
//             prompt : 'Please select at least two skills'
//           }
//         ]
//       },
//       gender: {
//         identifier: 'gender',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please select a gender'
//           }
//         ]
//       },
//       username: {
//         identifier: 'username',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter a username'
//           }
//         ]
//       },
//       password: {
//         identifier: 'password',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter a password'
//           },
//           {
//             type   : 'minLength[6]',
//             prompt : 'Your password must be at least {ruleValue} characters'
//           }
//         ]
//       },
//       terms: {
//         identifier: 'terms',
//         rules: [
//           {
//             type   : 'checked',
//             prompt : 'You must agree to the terms and conditions'
//           }
//         ]
//       }
//     }
//   })
// ;
    
//  ($('.ui.search') as any)
//   .search({
//     type          : 'category',
//     minCharacters : 3,
//     apiSettings   : {
//       onResponse: function(githubResponse) {
//         var
//           response = {
//             results : {}
//           }
//           ;
//         console.log('githubResponse',githubResponse);
//         // translate GitHub API response to work with search
//         ($ as any).each(githubResponse.items, function(index, item) {
//           var
//             language   = item.language || 'Unknown',
//             maxResults = 8
//           ;
//           if(index >= maxResults) {
//             return false;
//           }
//           // create new language category
//           if(response.results[language] === undefined) {
//             response.results[language] = {
//               name    : language,
//               results : []
//             };
//           }
//           // add result to category
//           response.results[language].results.push({
//             title       : item.name,
//             description : item.description,
//             url         : item.html_url
//           });
//         });
//         return response;
//       },
//       url: '//api.github.com/search/repositories?q={query}'
//     }
//   })
// ;

// ($('.ui.embed') as any).embed({
//   source      : 'youtube',
//   id          : 'watch?v=5DeVLSVF6mg&list=RD0hCx37sRN74&index=4',
//   placeholder : '/images/bear-waving.jpg'
// });
//    ($('.ui.search') as any)
//   .search({
//     type          : 'category',
//     minCharacters : 2,
//     apiSettings  : {
//       onResponse: function(githubResponse) {
//         var
//           response = {
//             results : {}
//           }
//           ;
//         console.log('githubResponse',githubResponse);
//         // translate GitHub API response to work with search
//         ($ as any).each(githubResponse.items, function(index, item) {
//           var
//             language   = item.language || 'Unknown',
//             maxResults = 8
//           ;
//           if(index >= maxResults) {
//             return false;
//           }
//           // create new language category
//           if(response.results[language] === undefined) {
//             response.results[language] = {
//               name    : language,
//               results : []
//             };
//           }
//           // add result to category
//           response.results[language].results.push({
//             title       : item.name,
//             description : item.description,
//             url: item.html_url,
//             price :item.size
//           });
//         });
//         return response;
//       },
//       url: '//api.github.com/search/repositories?q={query}'
//     }
//   })
// ;
    
    ($('.ui.accordion') as any).accordion();
 
   ($('.tab.demo .menu .item') as any)
      .tab({
      
    
      })
      ;
    var borderColor;

            ($('#tbcontentBorder')as any).ColorPicker({
                onSubmit :(hsb, hex, rgb, el)=> {
                    ($(el)as any).val('#' + hex);
                    ($(el)as any).ColorPickerHide();
                    borderColor = ($('#tbcontentBorder')as any).val();
                    ($('#news')as any).css('border-color', borderColor);
                },
                onBeforeShow : function() {
                    ($(this)as any).ColorPickerSetColor(this.value);
                }
            }).bind('keyup', function() {

                ($(this)as any).ColorPickerSetColor(this.value);

            });
    //     ($('#logIn')as any).click(function(){
    //     ($('#modal1') as any).modal('show');    
    //  });
  }
}

ValidationRules
  .ensure('firstName').required().withMessage('yêu cầu nhập first name')
  .ensure('lastName').required()
  .ensure('email').required().email()
  .on(RegistrationForm);