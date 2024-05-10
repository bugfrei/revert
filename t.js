console.log("Demo App");

// Kunde möchte eine Funktion, die Hello World ausgibt
// Nun soll die Funktion noch Daten ausgeben
function hello() {
    console.log("Hello World!");
    console.log(daten);
}

// Kunde möchte die Hello World Funktion 5 mal ausführen
for(let i = 0; i < 5; i++) {
    hello();
}

// Nun werden noch Daten erstellt

let data1 = "ABC";
let data2 = "123";

// diese Daten sollen in ein JSON-Objekt gepackt werden
let jdata = {
    data1: data1,
    data2: data2
}

// nur ein Kommentar - simuliert weitere Entwicklung OHNE Fehler

