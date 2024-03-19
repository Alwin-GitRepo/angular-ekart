import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any[],searchTerm:string,propsName:string): any[] {
    const result : any[] = [];
    if (!allProducts || searchTerm == "" || propsName == "")
    {
      return allProducts
    }
    // searchTerm = propsName
    allProducts.forEach((item:any)=>{
      if(item[propsName].toLowerCase().trim().includes(searchTerm.trim().toLowerCase()))
      {
        result.push(item)
      }
    })
    return result  // particular person details
  }

}
