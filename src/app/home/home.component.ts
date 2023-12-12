import { ApplicationInitStatus, Component, DoCheck, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Mongo } from '../Imodel/mongo';
import { Iregavel } from '../isRegavel/iregavel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public dados:any;

  public humidity = 0;
  public temp = 0;
  public ground_humidity = 0;
  public sky:String = "";
  public isRegavel:any;
  public isRegando:any;
  public valv = "Irrigação Desligada";
  public value:string = "";

  constructor(private apiService:ApiService){

  }
  ngOnInit(): void {

    this.getData();

    this.apiService.getRegando().subscribe(response => {

      this.dados = response.body

      this.isRegando = this.dados[0].isRegando

      if(this.isRegando){
        this.valv = "Irrigação Ligada"
      }else{
        this.valv = "Irrigação Desligada"
      }

  })

  setTimeout(function() {
    window.location.reload();
  }, 10000);


}

  getData(){

        this.apiService.getinfo().subscribe(response => {
      
            this.dados = response.body;

            this.humidity = this.dados[0].humidity;
            this.ground_humidity = this.dados[0].ground_humidity;
            this.temp = this.dados[0].temp;
            this.sky = this.dados[0].sky;
    
        if(this.temp > 25 && this.ground_humidity < 10 && this.sky == "céu limpo"){
          this.isRegavel = true;
        }else{
          //window.alert("No nomento nao é possível irrigar pois as condições não são favoráveis");
          this.isRegavel = true;
        }

        let isRegavel:Iregavel = {

          isRegavel: this.isRegavel,
          type:""

        }
  
      this.apiService.postRegavel(isRegavel).subscribe()  

      console.log("teste");

    })

    
  }

}
