import { MatchCryptosService } from "./services/MatchCryptosService";
import { GetInformations } from "./services/GetInformation";
import { Sort } from "./services/Sort";
import { Display } from "./services/Display";
import { BasicCrypto } from "./items/BasicCrypto";

async function getCryptos(){

    // Récupération des arguments entrés par l'utilisateur
    let args = process.argv.slice(2);
    args = args[0].split(',');

    // Récupération dans un tableau, d'objets BasicCrypto qui contiennent l'id, symbol et name de chaque crypto entrée en argument
    let matchCryptoService = new MatchCryptosService();
    let cryptos = await matchCryptoService.matchId(args);
    return cryptos;
}

async function update(cryptos: Array<BasicCrypto>){

    // Récupération des informations à afficher pour chaque crypto (market_cap, price, etc...)
    let getInformations = new GetInformations();
    let advancedCryptos = await getInformations.getAllInformations(cryptos);

    // Tri des cryptos par ordre croissant en fonction du rank (tri fusion)
    let sort = new Sort();
    let sortedCryptos = sort.mergeSort(advancedCryptos);
    
    // Afficher les informations des cryptos dans une table
    let display = new Display();
    display.displayAllInformations(sortedCryptos);
}

// Fonction pour mettre en pause pendant ms millisecondes (source : https://stackoverflow.com/questions/37764665/typescript-sleep)
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

// Fonction principale
async function start(){

    // On récupère les BasicCrypto correspondantes aux arguments de l'utilisateur
    let cryptos = await getCryptos();
    // On boucle à l'infini pour pouvoir update
    while(true){
        console.log("UPDATING")
        // On récupère les infos des cryptos et on les affiche
        await update(cryptos);
        // On attend 5 sec
        await delay(5000);
    }
}

start();
