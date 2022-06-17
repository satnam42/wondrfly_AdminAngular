import { Injectable } from "@angular/core";
@Injectable()
export class Globals {

  // ---time converter
  tools_replaceAll(str, find, replace) {
    str = str ? str.padStart(5, "0") : str;
    if (str && find && replace) {
      var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      str = str.replace(new RegExp(escapedFind, 'g'), replace)
      return str
    }
  }
}