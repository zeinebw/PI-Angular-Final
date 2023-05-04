import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceService {
  readonly API_URL = "http://localhost:8081/moneylend/Investment"
  readonly ENDPOINT_Invest_getAll= "/GetAll"

  constructor(private httpClient : HttpClient) { }

  getInvestments(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_Invest_getAll)
  }
  addInvestment(Investment:any){
    return this.httpClient.post(this.API_URL+"/AddInvestment",Investment);
  }
  addInvestmentwithPDF(Investment:any){
    return this.httpClient.post(this.API_URL+"/AddInvestments",Investment);
  }
  editInvestment(Investment:any){
    return this.httpClient.put(this.API_URL+"/modifierInvestment",Investment);
  }

  deleteInvestment(id:any){
    return this.httpClient.delete(this.API_URL+"/deleteByIdInvestment?id="+id);
  }
  findByType(searchValue: any) : Observable<any>{
    return this.httpClient.get<any>(this.API_URL+"/afficherparType?type="+searchValue);
  }
  getInvestmentById(id:any){
    return this.httpClient.get(this.API_URL+"/afficherInvestmentavecId?id="+id);
  }
  
  calculateInterest(investmentId: number, beginningPrice: number, endingPrice: number): Observable<number> {
    return this.httpClient.post<number>(this.API_URL+"/calculInterest?investmentId="+ investmentId +"&beginningPrice=" + beginningPrice +
    "&endingPrice=" + endingPrice,null);
  }

  calculateStockInterestRate(investmentId: number, beginningPrice: number, endingPrice: number): Observable<number> {
    return this.httpClient.post<number>(this.API_URL+"/calculateStockInterest?investmentId="+ investmentId +"&beginningPrice=" + beginningPrice +
    "&endingPrice=" + endingPrice,null);
  }
  calculatePlcementInterestRate(investmentId: number): Observable<number> {
    return this.httpClient.post<number>(this.API_URL+"/calculerTauxInteret?investmentId="+ investmentId,null);
  }
  /*calculateStockGain(investmentId: number, beginningPrice: number, endingPrice: number, dividends: number): Observable<number> {
    return this.httpClient.post<number>(this.API_URL+"/calculate-gain-forstocks?investmentId="+ investmentId +"&beginningPrice=" + beginningPrice +
    "&endingPrice=" + endingPrice+"&dividends=" + dividends ,null);
  }*/

  calculatePlcementGain(investmentId: number, compoundingPeriodInMonths: number): Observable<number> {
    return this.httpClient.post<number>(this.API_URL+"/calculate-gain-forplacement?investmentId="+ investmentId +"&compoundingPeriodInMonths=" + compoundingPeriodInMonths,null);
  }

  calculatePlacementGain(investmentId: number, compoundingPeriodInMonths: number) {
    const url = `/calculate-gain-forplacement?investmentId=${investmentId}&compoundingPeriodInMonths=${compoundingPeriodInMonths}`;
  
    return this.httpClient.post(this.API_URL+url, {});
  }
  
  
  calculateStockGain(investmentId: number, beginningPrice: number, endingPrice: number, dividends: number): Observable<HttpResponse<Map<number, number>>> {
    const params = new HttpParams()
      .set('investmentId', investmentId.toString())
      .set('beginningPrice', beginningPrice.toString())
      .set('endingPrice', endingPrice.toString())
      .set('dividends', dividends.toString());
  
    return this.httpClient.post<Map<number, number>>(this.API_URL + '/calculate-gain-forstocks', null, {
      params: params,
      observe: 'response'
    });
  }
  
  
}
  

