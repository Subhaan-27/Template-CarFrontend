import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";


let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content")
let GetAllCarsButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("getAllButton")

GetAllCarsButton.addEventListener('click', ShowAllCars)

let AddCarButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("addButton")
AddCarButton.addEventListener('click', addCar);

function addCar(): void{ 

    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel")
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor")
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice")

    let myModel: string = addModelelement.value;
    let myVendor: string = addVendorelement.value;
    let myPrice: number = +addPriceelement.value;
    console.log("model" + myModel);
    console.log ("vendor"+ myVendor);
    console.log ("price"+ myPrice);



    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars", 
    {model:myModel, vendor:myVendor, price:myPrice}) 
    .then (function (response:AxiosResponse): void
    {
        console.log("Statuskoden er :" +response.status);
    })
    .catch(
        function (error:AxiosError) :void
        {
            console.log("Error i min kode")
            console.log(error)

        }
        )
    
    


}


function ShowAllCars():void{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function(response:AxiosResponse<ICar[]>): void
    {
        console.log("Er i Then")
        console.log(response)
        
        let result: string ="<ol>"

        response.data.forEach((car:ICar) => {
            result += "<li> class = 'bil' "+ car.model+ ""  +  car.vendor +""+ car.id +"</li>"
            result += "</ol>"
            
            ContentElement.innerHTML = result;
        });

    })
    .catch(
        function(error:AxiosError) : void{
            console.log("Error i min kode")
            console.log(error)

        }
        )
        console.log("Er i slutningen af ShowAllCars function")

}

